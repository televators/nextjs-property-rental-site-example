'use server';
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

async function checkBookmarkStatus( propertyID ) {
  await connectDB();

  //#region User Authentication & Authorization
  const sessionUser = await getSessionUser();

  if ( ! sessionUser || ! sessionUser.userID ) throw new Error( 'User ID is required' );

  const { userID } = sessionUser;
  //#endregion

  // Grab user from DB
  const user = await User.findById( userID );
  // Check if current property is bookmarked
  const isBookmarked = user.bookmarks.includes( propertyID );

  return { isBookmarked };
}

export default checkBookmarkStatus;
