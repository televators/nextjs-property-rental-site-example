import connectDB from "@/config/database";
import User from '@/models/User';
import { getSessionUser } from "@/utils/getSessionUser";

// Needed for prod on Vercel for some reason.
export const dynamic = 'force-dynamic';

export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const propertyID = params.id;
    const sessionUser = await getSessionUser();

    if ( !sessionUser || !sessionUser.userID ) {
      return new Response('User ID is required.', {status: 401});
    }

    // Get user from DB
    const user = await User.findOne({ _id: sessionUser.userID });
    // Check if current property is bookmarked
    let isBookmarked = user.bookmarks.includes(propertyID);

    return Response.json({
      isBookmarked,
    }, { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response("Error fetching property's bookmark status.", { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await connectDB();

    const { propertyId } = await request.json();
    const sessionUser = await getSessionUser();

    if ( !sessionUser || !sessionUser.userID ) {
      return new Response('User ID is required.', {status: 401});
    }

    // Get user from DB
    const user = await User.findOne({ _id: sessionUser.userID });

    // Check if current property is bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);
    let message;

    if ( isBookmarked ) {
      // If already bookmarked, unbookmark that bish.
      user.bookmarks.pull(propertyId);
      message = 'Bookmark removed successfully.';
      isBookmarked = false;
    } else {
      // Bookmark that bish.
      user.bookmarks.push(propertyId);
      message = 'Bookmark added successfully.'
      isBookmarked = true;
    }

    await user.save();

    return Response.json({
      message,
      isBookmarked
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Error trying to bookmark property.', { status: 500 });
  }
};
