import { revalidatePath } from "next/cache";
import connectDB from "@/config/database";
import Property from '@/models/Property';
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";

// GET /api/properties/:id
export const GET = async ( request, { params } ) => {
  try {
    await connectDB();

    const { id: propertyID } = params;
    const property = await Property.findById( propertyID );

    if ( ! property ) return new Response( 'Property not found.', { status: 404 } );

    return Response.json( property, { status: 200 } );
  } catch ( error ) {
    console.error( error );

    return new Response( 'Something went wrong when fetching single property.', { status: 500 } );
  }
};

// PUT /api/properties/:id
export const PUT = async ( request, { params } ) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if ( ! sessionUser || ! sessionUser.userID ) {
      return new Response( 'User ID is required.', { status: 401 } );
    }

    const { id: propertyID } = params;
    const { userID } = sessionUser;

    const formData = await request.formData();

    // Get all of the amenities
    const amenities = formData.getAll( 'amenities' );

    // Get existing property by ID
    const exisitingProperty = await Property.findById( propertyID );

    if ( ! exisitingProperty ) {
      return new Response( 'Property not found.', { status: 404 } );
    }

    // Verify ownership
    if ( exisitingProperty.owner.toString() !== userID ) {
      return new Response("Unauthorized: user doesn't own requested property.", { status: 401 });
    }

    // Create big ol' object to ship to DB.
    // NOTE: Images aren't set directly here since they're grabbed from the form data,
    // uploaded to Cloudinary, then the URLs for them from Cloudinary are added to the
    // images array in the DB for the property.
    const propertyData = {
      type: formData.get( 'type' ),
      name: formData.get( 'name' ),
      description: formData.get( 'description' ),
      location: {
        street: formData.get( 'location.street' ),
        city: formData.get( 'location.city' ),
        state: formData.get( 'location.state' ),
        zipcode: formData.get( 'location.zipcode' ),
      },
      beds: formData.get( 'beds' ),
      baths: formData.get( 'baths' ),
      square_feet: formData.get( 'square_feet' ),
      amenities,
      rates: {
        nightly: formData.get( 'rates.nightly' ),
        weekly: formData.get( 'rates.weekly' ),
        monthly: formData.get( 'rates.monthly' ),
      },
      seller_info: {
        name: formData.get( 'seller_info.name' ),
        email: formData.get( 'seller_info.email' ),
        phone: formData.get( 'seller_info.phone' ),
      },
      owner: userID,
    };

    // Update property in DB with new data
    const updatedProperty = await Property.findByIdAndUpdate(propertyID, propertyData);

    return Response.json( updatedProperty, { status: 200 } );
  } catch ( error ) {
    console.log( error );
    return new Response( 'Faileure adding property', { status: 500 } );
  }
};

// DELETE /api/properties/:id
export const DELETE = async ( request, { params } ) => {
  try {
    const propertyID = params.id;
    const sessionUser = await getSessionUser();

    if ( ! sessionUser || ! sessionUser.userID ) {
      return new Response( 'User ID is required.',  { status: 401 } );
    }

    const { userID } = sessionUser;

    await connectDB();

    const property = await Property.findById( propertyID );

    if ( ! property ) return new Response( 'Property not found.', { status: 404 } );

    // Verify current user owns property to be deleted
    if ( property.owner.toString() !== userID ) {
      return new Response( "Unauthorized: current user doesn't own requested property.", { status: 401 } );
    }

    // Extract public IDs from Cloudinary image URL in DB
    const publicIDs = property.images.map( ( imageURL ) => {
      const parts = imageURL.split('/');

      return parts.at( -1 ).split( '.' ).at( 0 );
    } );

    // Delete image from Cloudinary with given public ID
    if ( publicIDs.length > 0 ) {
      for ( let publicID of publicIDs ) {
        await cloudinary.uploader.destroy( `propertypulse/${ publicID }` )
      }
    }

    // After deleting image from Cloudinary, delete the property
    await property.deleteOne();

    // After property and associated images have been deleted, revalidate the cache for the Properties page
    revalidatePath('/properties', 'page');

    return new Response( 'Property deleted successfully.', { status: 200 } );
  } catch ( error ) {
    console.error( error );

    return new Response( 'Something went wrong trying to delete property.', { status: 500 } );
  }
};
