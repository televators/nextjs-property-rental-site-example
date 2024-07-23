'use server';
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function bookmarkProperty( propertyID ) {
  await connectDB();

  //#region User Authentication & Authorization
  const sessionUser = await getSessionUser();

  if ( ! sessionUser || ! sessionUser.userID ) throw new Error( 'User ID is required' );

  const { userID } = sessionUser;
  //#endregion

  // Grab user from DB
  const user = await User.findById( userID );
  // Check if current property is bookmarked
  let isBookmarked = user.bookmarks.includes( propertyID );
  // Success or error message sent to client
  let message;

  if ( isBookmarked ) {
    // If already bookmarked, unbookmark that bish.
    user.bookmarks.pull( propertyID );
    message = 'Bookmark removed successfully.';
    isBookmarked = false;
  } else {
    // Bookmark that bish.
    user.bookmarks.push( propertyID );
    message = 'Bookmark added successfully.'
    isBookmarked = true;
  }

  // Save change to user in DB
  await user.save();

  // Revalidate cache. If not done, navigating to user's 'Saved Properties' page will show nothing until full refresh.
  revalidatePath( '/properties/bookmarked', 'page' );

  return { message, isBookmarked };
}

export default bookmarkProperty;
