import connectDB from "@/config/database";
import Property from '@/models/Property';

// GET /api/properties
export const GET = async ( request ) => {
  try {
    await connectDB();

    const properties = await Property.find( {} );

    return new Response( JSON.stringify( properties ), { status: 200 } );
  } catch ( error ) {
    console.error( error );

    return new Response( 'Something went wrong', { status: 500 } );
  }
};

export const POST = async ( request ) => {
  try {
    const formData = await request.formData();

    // Get all of the amenities
    const amenities = formData.getAll( 'amenities' );
    const images = formData.getAll( 'images' ).filter( ( image ) => image.name !== '' );

    // Create big ol' object to ship to DB
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
      images,
    };

    return new Response( JSON.stringify( { message: 'Great success' } ), { status: 200 } );
  } catch ( error ) {
    return new Response( 'Faileure adding property', { status: 500 } );
  }
};
