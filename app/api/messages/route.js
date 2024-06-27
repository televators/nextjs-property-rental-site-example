import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

// POST /api/messages
export const POST = async (request) => {
  try {
    await connectDB();

    const data = await request.json(),
    {
      name,
      email,
      phone,
      message,
      property,
      recipient
    } = data;

    const sessionUser = await getSessionUser();

    if ( ! sessionUser || ! sessionUser.user ) {
      return Response.json({
        message: 'You must be signed in to send a message.',
      }, { status: 401 });
    }

    const { user } = sessionUser;

    // Don't allow user to message themselves
    if ( user.id === recipient ) {
      return Response.json( {
        message: "Can't send message to self."
      }, { status: 400 } );
    }

    const newMessage = new Message( {
      sender: user.id,
      recipient,
      property,
      name,
      email,
      phone,
      body: message,
    } );

    await newMessage.save();

    return Response.json( {
      message: 'Message sent successfully.'
    }, { status: 200 } );
  } catch (error) {
    console.error('Error saving new message.');
    console.error(error);

    return Response.json({
      message: 'Error sending message.',
    }, { status: 500 });
  }
};
