import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

// GET /api/messages/unread-count
export const GET = async (_request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if ( ! sessionUser || ! sessionUser.user ) {
      return Response.json({
        message: 'You must be signed in to view messages.'
      }, { status: 401 });
    }

    const { userID } = sessionUser;
    const unreadMessageCount = await Message.countDocuments({ recipient: userID, read: false });


    return Response.json(unreadMessageCount, { status: 200 });
  } catch (error) {
    console.error('Error checking for new messages.');
    console.error(error);

    return Response.json({
      message: 'Error checking for new messages.'
    }, { status: 500 });
  }
};
