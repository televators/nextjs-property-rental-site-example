import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

// PUT /api/messages/:id
export const PUT = async (_request, { params }) => {
  try {
    await connectDB();

    const { id: MessageID } = params;
    const sessionUser = await getSessionUser();

    if ( ! sessionUser || ! sessionUser.user ) {
      return Response.json({
        message: 'You must be signed in to view messages.'
      }, { status: 401 });
    }

    const { userID } = sessionUser;
    const message = await Message.findById( MessageID );

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

// DELETE /api/messages/:id
export const DELETE = async (_request, { params }) => {
  try {
    await connectDB();

    const { id: messageID } = params;
    const sessionUser = await getSessionUser();

    if ( ! sessionUser || ! sessionUser.user ) {
      return Response.json({
        message: 'You must be signed in to delete messages.'
      }, { status: 401 });
    }

    const { userID } = sessionUser;
    const message = await Message.findById( messageID );

    if (!message) return Response.json({
      message: 'Message not found.'
    }, { status: 404 });

    // Verify ownership of fetched message
    if ( message.recipient.toString() !== userID ) {
      return Response.json({
        message: 'Unauthorized: user doesn\'t own message.'
      }, { status: 401 });
    }

    // NOTE: All docs and references online show using the Model itself and passing
    // the id, but Brad is doing it on an instance with implied default id of instance.
    // Model.deleteOne({_id: id}) vs model.deleteOne().
    const deleteRes = await message.deleteOne();

    // Check whether we got a response from Mongoose and that deletedCount is a number.
    if ( typeof deleteRes.deletedCount === 'undefined' || typeof deleteRes.deletedCount !== 'number' ) {
      console.error('Error deleting message. Incorrect response type: ', deleteRes.deletedCount);
      return Response.json({
        message: 'Error deleting message.',
      }, { status: 500 });
    }

    // Valid response but the message wasn't deleted for some reason.
    if ( deleteRes.deletedCount === 0 ) {
      return Response.json({
        message: 'Error deleting message. Please try again.',
      }, { status: 500 });
    }

    // Message deleted successfully.
    if ( deleteRes.deletedCount === 1 ) {
      return Response.json({
        message: 'Message deleted successfully.',
      }, { status: 200 });
    }

    // More than one message was deleted for some reason. D:
    if ( deleteRes.deletedCount > 1 ) {
      return Response.json({
        message: 'Error: more than one message deleted. Please contact support and don\'t try again yet.',
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error deleting message.');
    console.error(error);

    return Response.json({
      message: 'Error deleting message.'
    }, { status: 500 });
  }
};
