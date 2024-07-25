'use server';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function editProperty( propertyID, formData ) {
  try {
    await connectDB();

    //#region User Authentication & Authorization
    const sessionUser = await getSessionUser();

    if ( ! sessionUser || ! sessionUser.userID ) {
      throw new Error( 'User ID is required.' );
    }

    const { userID } = sessionUser;
    //#endregion

    // Get existing property by ID
    const existingProperty = await Property.findById( propertyID );

    // Verify ownership
    if ( existingProperty.owner.toString() !== userID ) {
      throw new Error( "Unauthorized: user doesn't own requested property." );
    }

    // DEBUG:
    console.log(formData.get( 'featured' ));

    //#region Create Property data object for database
    // Get Amenities
    const amenities = formData.getAll( 'amenities' );

    //#region Get Featured Status
    let featured = false;
    const featuredData = formData.get( 'featured' );

    if ( featuredData === 'on' ) {
      featured = true;
    }
    //#endregion

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
      is_featured: featured,
      owner: userID,
    };
    //#endregion

    //#region Update Property in DB with new data
    await Property.findByIdAndUpdate( propertyID, propertyData );
    //#endregion
  } catch ( error ) {
    throw new Error( error );
  }

  // Redirect to Property page
  // NOTE: Redirect from server action throws "Error: Error: NEXT_REDIRECT" error if called from inside a try..catch block even if there wasn't an error. So, have to call it outside which means the redirect will still happen even if there was an error. Pretty stupid. Allegedly, can use some Transition stuff to work around it which I haven't looked into yet.
  +
  redirect( `/properties/${ propertyID }` );
}

export default editProperty;
