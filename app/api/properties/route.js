import connectDB from "@/config/database";
import Property from '@/models/Property';
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";
import { revalidatePath } from "next/cache";

// GET /api/properties
// NOTE: If requesting the plain route itself, will return all properties in a simple array. If there are query params, checks for paging and returns object with count and properties themselves.
export const GET = async ( request ) => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    if ( [...searchParams].length > 0 ) {
      const page = searchParams.get('page') || 1;
      // TODO: Before launch, set initial pageSize to 9 so the page loads a full page at first, then set pageSize to 3 or 6 after initial load. Will have to add like fifteen more properties to DB.
      const pageSize = searchParams.get('page-size') || 6;

      const skip = (page - 1) * pageSize;

      const propertiesCount = await Property.countDocuments({});
      const properties = await Property.find({}).skip(skip).limit(pageSize);

      const result = {
        propertiesCount,
        properties,
      };

      return Response.json( result, { status: 200 } );
    } else {
      const properties = await Property.find({});

      return Response.json( properties, { status: 200 } );
    }

  } catch ( error ) {
    console.error( error );

    return new Response( 'Something went wrong', { status: 500 } );
  }
};

export const POST = async ( request ) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if ( ! sessionUser || ! sessionUser.userID ) {
      return new Response( 'User ID is required.', { status: 401 } );
    }

    const { userID } = sessionUser;

    const formData = await request.formData();

    // Get all of the amenities and images
    const amenities = formData.getAll( 'amenities' );
    const images = formData.getAll( 'images' ).filter( ( image ) => image.name !== '' );

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
      images: [],
      owner: userID,
    };

    // Upload images to Cloudinary
    for ( const image of images ) {
      const mimeType = image.type;
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from( new Uint8Array( imageBuffer ) );
      const imageData = Buffer.from( imageArray );

      // Convert image data to base64
      const imageBase64 = imageData.toString( 'base64' );

      // Make Cloudinary upload request
      const result = await cloudinary.uploader.upload(
        `data:${ mimeType };base64,${ imageBase64 }`,
        {
          folder: 'propertypulse',
        }
      );

      // Add each uploaded image's secure URL to the propertyData.images array
      propertyData.images.push( result.secure_url );
    }

    // Create new Property from Mongoose Schema.
    const newProperty = new Property( propertyData );
    // Save new Property to DB.
    await newProperty.save();

    // Invalidate cache for All Properties page so that the image is fetched
    // for the new property when user visits /properties.
    revalidatePath( '/properties' );
    // Redirect to new single Property
    // TODO: Add popup asking if you want to see new single, add another, or go to all Properties.
    return Response.redirect( `${ process.env.NEXTAUTH_URL }/properties/${ newProperty._id }` );
    // return Response.json( { message: 'Great success' }, { status: 200 } );
  } catch ( error ) {
    console.log( error );
    return new Response( 'Faileure adding property', { status: 500 } );
  }
};
