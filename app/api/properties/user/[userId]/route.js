import connectDB from "@/config/database";
import Property from '@/models/Property';

// GET /api/properties/user/:userId
export const GET = async ( request, { params } ) => {
  try {
    await connectDB();

    const userID = params.userId;

    if ( ! userID ) return new Response( 'User ID is required.', { status: 400 } );

    // Get all properties belonging to current user.
    const properties = await Property.find( { owner: userID } );

    return Response.json( properties, { status: 200 } );
  } catch ( error ) {
    console.error( error );

    return new Response( 'Something went wrong', { status: 500 } );
  }
};
