import connectDB from "@/config/database";
import Message from "@/models/Message";
import Property from "@/models/Property";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

// NOTE: Mongoose is kinda buggy and every like 15th time a page loads, one or more Models aren't defined.
// Normally, I'm not importing the Property and User model and it's fine but when Mongoose goofs, the only
// way to resolve it is to import the models here, save, and reload. After that, I can delete the imports,
// save, and it will continue to work normally for a long time. So, I'm just going to leave the imports
// uncommented to stop dealing with the server erroring out randomly.

export const dynamic = 'force-dynamic';

// GET /api/messages
export const GET = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if ( ! sessionUser || ! sessionUser.user ) {
      return new Response('You must be signed in to view messages.', { status: 401 });
    }

    const { userID } = sessionUser;
    const messages = await Message.find({recipient: userID }).populate('sender', 'name').populate('property', 'title');

    return Response.json( messages, { status: 200 } );
  } catch (error) {
    console.error('Error getting messages.', '\n', error);

    return Response.json({
      message: 'Error getting messages.',
    }, { status: 500 });
  }
};

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
    // NOTE: Added some conditional rendering on the front-end so that the form doesn't even show
    // for a user viewing their own property. Still keeping this in case there's ever some weird
    // rendering issue with the component and the form shows for user's own property.
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
    console.error('Error saving new message.', '\n', error);

    return Response.json({
      message: 'Error sending message.',
    }, { status: 500 });
  }
};
