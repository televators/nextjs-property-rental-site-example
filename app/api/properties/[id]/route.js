import connectDB from "@/config/database";
import Property from '@/models/Property';
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";

// GET /api/properties/:id
export const GET = async ( request, { params } ) => {
  try {
    await connectDB();

    const property = await Property.findById( params.id );

    if ( ! property ) return new Response( 'Property not found.', { status: 404 } );

    return Response.json( property, { status: 200 } );
  } catch ( error ) {
    console.error( error );

    return new Response( 'Something went wrong when fetching single property.', { status: 500 } );
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

    return new Response( 'Property deleted successfully.', { status: 200 } );
  } catch ( error ) {
    console.error( error );

    return new Response( 'Something went wrong trying to delete property.', { status: 500 } );
  }
};
