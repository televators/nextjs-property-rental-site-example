'use server';
import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function markMessageAsRead( messageID ) {
  try {
    await connectDB();

    //#region User Authentication & Authorization
    const sessionUser = await getSessionUser();

    if ( ! sessionUser || ! sessionUser.user ) throw new Error( 'User ID is required' );

    const { userID } = sessionUser;
    //#endregion

    //#region Search for Message, verify ownership, flip the 'read' status
    const message = await Message.findById( messageID );

    if ( ! message ) throw new Error( 'Message not found' );

    // Verify ownership
    if ( message.recipient.toString() !== userID ) throw new Error( 'Unauthorized' );

    // Flip 'read' status
    message.read = !message.read;

    // Revalidate cache
    revalidatePath( '/messages', 'page' );

    // Save the new status
    await message.save();

    return message.read;
    //#endregion
  } catch (error) {
    throw new Error(error);
  }
}

export default markMessageAsRead;
