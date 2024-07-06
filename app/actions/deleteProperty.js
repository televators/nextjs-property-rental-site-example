'use server';
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty( propertyID ) {
  try {
    await connectDB();

    //#region User Authentication & Authorization
    const sessionUser = await getSessionUser();

    if ( ! sessionUser || ! sessionUser.userID ) {
      return new Response( 'User ID is required.',  { status: 401 } );
    }

    const { userID } = sessionUser;
    //#endregion

    //#region Get & Validate Property
    const property = await Property.findById( propertyID );

    if ( ! property ) throw new Error( 'Property not found.' );

    // Verify current user owns property to be deleted
    if ( property.owner.toString() !== userID ) {
      throw new Error( "Unauthorized: current user doesn't own requested property." );
    }
    //#endregion

    //#region Delete associated images from Cloudinary
    // Extract public IDs from Cloudinary image URL in DB
    const publicIDs = property.images.map( ( imageURL ) => {
      const parts = imageURL.split('/');

      // Splits off the image's public ID from the full URL
      return parts.at( -1 ).split( '.' ).at( 0 );
    } );

    // Delete image from Cloudinary with given public ID
    if ( publicIDs.length > 0 ) {
      for ( let publicID of publicIDs ) {
        await cloudinary.uploader.destroy( `propertypulse/${ publicID }` )
      }
    }
    //#endregion

    // After deleting image from Cloudinary, delete the property
    await property.deleteOne();

    // After property and associated images have been deleted, revalidate the cache for the Properties page
    revalidatePath('/properties', 'page');
  } catch (error) {
    console.error(error);
  }
}

export default deleteProperty;
