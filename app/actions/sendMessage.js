'use server';
import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function sendMessage( previousState, formData ) {
  try {
    await connectDB();

    //#region User Authentication & Authorization
    const sessionUser = await getSessionUser();

    if ( ! sessionUser || ! sessionUser.user ) return { error: 'You must be signed in to send a message.' };

    const { userID } = sessionUser;
    //#endregion

    const recipient = formData.get( 'recipient' );

    if ( userID === recipient ) return {
      submitted: false,
      error: "You can't send a message to yourself.",
    };

    const newMessage = new Message( {
      sender: userID,
      recipient,
      property: formData.get( 'property' ),
      name: formData.get( 'name' ),
      email: formData.get( 'email' ),
      phone: formData.get( 'phone' ),
      body: formData.get( 'message' ),
    } );

    await newMessage.save();

    revalidatePath( '/messages', 'page' );

    return {
      submitted: true,
      error: false,
    };
  } catch ( error ) {
    throw new Error( error );
  }
}

export default sendMessage;
