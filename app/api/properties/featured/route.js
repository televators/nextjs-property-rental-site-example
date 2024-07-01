import connectDB from "@/config/database";
import Property from '@/models/Property';

// GET /api/properties/featured
export const GET = async ( request ) => {
  try {
    await connectDB();

    let properties;
    const { searchParams } = new URL(request.url);

    if ( [...searchParams].length > 0 ) {
      const count = searchParams.get('count');
      properties = await Property.find({ is_featured: true }).limit(count);
    } else {
      properties = await Property.find({ is_featured: true });
    }

    return Response.json( properties, { status: 200 } );
  } catch ( error ) {
    console.error( error );

    return new Response( 'Something went wrong', { status: 500 } );
  }
};
