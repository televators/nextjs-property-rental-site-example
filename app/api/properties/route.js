import connectDB from "@/config/database";
import Property from '@/models/Property';
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";

// GET /api/properties
export const GET = async ( request ) => {
  try {
    await connectDB();

    const properties = await Property.find( {} );

    return Response.json( properties, { status: 200 } );
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

    // Get all of the amenities
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
      owner: userID,
    };

    // Upload images to Cloudinary
    const imageURLs = [];

    for ( const image of images ) {
      const mimeType = image.type;
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from( new Uint8Array( imageBuffer ) );
      const imageData = Buffer.from( imageArray );

      // Convert image data to base64
      const imageBase64 = imageData.toString( 'base64' );

      // Make Cloudinary upload request
      const result = cloudinary.uploader.upload(
        `data:${ mimeType };base64,${ imageBase64 }`,
        {
          folder: 'propertypulse',
          timeout: 6000,
        },
        function( error, result ) {
          if ( error ) {
            console.log( '--== UPLOAD ERROR CB ==--' );
            console.log( error );
          } else {
            console.log( '--== UPLOAD RESULT CB ==--' );
            console.log( result );
          }
        }
      );

      imageURLs.push( result.secure_url )
    }

    // Add uploaded image URLs to the propertyData object
    propertyData.images = imageURLs

    // TEMP
    // console.log(propertyData);

    const newProperty = new Property( propertyData );
    await newProperty.save();

    // return Response.redirect( `${ process.env.NEXTAUTH_URL }/properties/${ newProperty._id }` );
    return Response.json( { message: 'Great success' }, { status: 200 } );
  } catch ( error ) {
    console.log( error );
    return new Response( 'Faileure adding property', { status: 500 } );
  }
};
