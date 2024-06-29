import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

// PUT /api/messages/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const { id } = params;
    const sessionUser = await getSessionUser();

    if ( ! sessionUser || ! sessionUser.user ) {
      return Response.json({
        message: 'You must be signed in to view messages.'
      }, { status: 401 });
    }

    const { userID } = sessionUser;
    const message = await Message.findById( id );

    if (!message) return Response.json({
      message: 'Message not found.'
    }, { status: 404 });

    // Verify ownership of fetched message
    if ( message.recipient.toString() !== userID ) {
      return Response.json({
        message: 'Unauthorized: user doesn\'t own message.'
      }, { status: 401 });
    }

    // Flip message's 'read' status
    message.read = !message.read;

    // Save the new status
    await message.save();

    return Response.json(message.read, { status: 200 });
  } catch (error) {
    console.error('Error changing message\'s read status.');
    console.error(error);

    return Response.json({
      message: 'Error changing message\'s read status.'
    }, { status: 500 });
  }
};
