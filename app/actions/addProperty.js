'use server';
import connectDB from "@/config/database";
import Property from '@/models/Property';
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';

async function addProperty( formData ) {
  await connectDB();

  //#region User Authentication & Authorization
  const sessionUser = await getSessionUser();

  // NOTE: throwing an Error from our server actions will be caught by our
  // error.jsx ErrorBoundary component and show the user an Error page with
  // message of the thrown error.

  if (!sessionUser || !sessionUser.userID) {
    throw new Error('User ID is required');
  }

  const { userID } = sessionUser;
  //#endregion

  //#region Create Property data object for database
  // Get Amenities & Image Data
  const amenities = formData.getAll( 'amenities' );
  const images = formData.getAll( 'images' ).filter( ( image ) => image.name !== '' );

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

  //#region Upload images to Cloudinary
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
  //#endregion
  //#endregion

  //#region Create new Property from schema and save to DB
  const newProperty = new Property( propertyData );

  await newProperty.save();
  //#endregion

  //#region Cache Invalidation & Server Response
  // NOTE: Invalidate cache so that the image is fetched for the new property when
  // user next visits /properties. Since properties are on most pages, we can just
  // revalidate everything using the top level layout.
  revalidatePath( '/', 'layout' );

  // Redirect to new single Property
  redirect( `/properties/${ newProperty._id }` );
  //#endregion
}

export default addProperty;
