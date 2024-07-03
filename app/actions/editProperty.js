'use server';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function editProperty( propertyID, formData ) {
  await connectDB();

  //#region User Authentication & Authorization
  const sessionUser = await getSessionUser();

  if ( ! sessionUser || ! sessionUser.userID ) {
    return new Response( 'User ID is required.', { status: 401 } );
  }

  const { userID } = sessionUser;
  //#endregion

  // Get existing property by ID
  const existingProperty = await Property.findById( propertyID );

  // Verify ownership
  if ( existingProperty.owner.toString() !== userID ) {
    return new Response("Unauthorized: user doesn't own requested property.", { status: 401 });
  }

  //#region Create Property data object for database
  // Get Amenities
  const amenities = formData.getAll( 'amenities' );

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
  //#endregion

  //#region Update Property in DB with new data
  const updatedProperty = await Property.findByIdAndUpdate(propertyID, propertyData);

  // NOTE: Invalidate cache so that the image is fetched for the new property when
  // user next visits /properties. Since properties are on most pages, we can just
  // revalidate everything using the top level layout.
  revalidatePath( '/', 'layout' );

  // Redirect to new single Property
  redirect( `/properties/${ updatedProperty._id }` );
  //#endregion
}

export default editProperty;
