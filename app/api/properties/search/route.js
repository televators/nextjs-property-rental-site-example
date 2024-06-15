import connectDB from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties/search
export const GET = async (request) => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('s');
    const type = searchParams.get('property-type');

    const queryPattern = new RegExp(query, 'i');
    // Match keyword(s) against Property fields
    let queryMatch = {
      $or: [
        { name: queryPattern },
        { description: queryPattern },
        { 'location.street': queryPattern },
        { 'location.city': queryPattern },
        { 'location.state': queryPattern },
        { 'location.zipcode': queryPattern },
      ],
    };

    // Only check for property type if not 'All'
    if ( type && type !== 'All' ) {
      const typePattern = new RegExp( type, 'i' );
      queryMatch.type = typePattern;
    }

    const properties = await Property.find(queryMatch);

    return Response.json(properties, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Error with search request.', { status: 500 });
  }
};
