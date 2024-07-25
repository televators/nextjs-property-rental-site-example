import connectDB from '@/config/database';
import Message from '@/models/Message';
// HACK: Prevents random and infrequent issue where Mongoose loads things out of order.
import Property from '@/models/Property';
// HACK: Prevents random and infrequent issue where Mongoose loads things out of order.
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';
import { convertToSerializableObject } from '@/utils/convertToObject';
import MessageCard from '@/components/messages/MessageCard';

// TODO: Figure out how to deal with not being able to render a 'no messages' condition when the last message has been deleted. Currently, there's no obvious way to do this with this setup since messages is only set once on initial mount and the parent doesn't know the number of MessageCards. Is the only way really just to refetch all messages when you delete one? That feels wasteful and un-performant.

// NOTE: Mongoose is kinda buggy and every like 15th time a page loads, one or more Models aren't defined. Normally, I'm not importing the Property and User model and it's fine but when Mongoose goofs, the only way to resolve it is to import the models here, save, and reload. After that, I can delete the imports, save, and it will continue to work normally for a long time. So, I'm just going to leave the imports uncommented to stop dealing with the server erroring out randomly.
const MessagesPage = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();
  const { userID } = sessionUser;

  const messageDocs = await Message.find({ recipient: userID })
    .populate('sender', 'username')
    .populate('property', 'name')
    .sort({ read: 'asc', createdAt: 'desc' })
    .lean();

  // Convert to serializable object to pass to client component MessageCard
  const messages = [...messageDocs].map((messageDoc) => {
    const message = convertToSerializableObject(messageDoc);
    message.sender = convertToSerializableObject(messageDoc.sender);
    message.property = convertToSerializableObject(messageDoc.property);

    return message;
  });

  return (
    <section className='py-24 bg-blue-50'>
      <div className='container max-w-6xl m-auto'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Messages</h1>
          {messages.length === 0 ? (
            <p>No messages.</p>
          ) : (
            messages.map((message) => <MessageCard key={message._id} message={message} />)
          )}
        </div>
      </div>
    </section>
  );
};
export default MessagesPage;
