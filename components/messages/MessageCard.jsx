'use client';
import { useState } from 'react';
import getFormattedTimestamp from '@/utils/getFormattedTimestamp';
import getFormattedPhone from '@/utils/getFormattedPhone';
import { useGlobalContext } from '@/context/GlobalContext';
import { toast } from 'react-toastify';
import markMessageAsRead from '@/app/actions/markMessageAsRead';
import deleteMessage from '@/app/actions/deleteMessage';

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [wasDeleted, setWasDeleted] = useState(false);

  const { setUnreadCount } = useGlobalContext();

  const handleMarkAsRead = async () => {
    const read = await markMessageAsRead(message._id);

    // Update local state
    setIsRead(read);
    // Update global state
    setUnreadCount((prev) => (read ? prev - 1 : prev + 1));

    toast.success(`Message marked as ${isRead ? "'new'" : "'read'"}.`);
  };

  const handleDelete = async () => {
    await deleteMessage(message._id);

    setWasDeleted(true);
    setUnreadCount((prevCount) => (isRead ? prevCount : prevCount - 1));

    toast.success('Message Deleted');
  };

  if (wasDeleted) {
    return null;
  }

  return (
    <div className='relative bg-white [&:not(:last-child)]:mb-5 p-4 rounded-md shadow-md border border-gray-200'>
      {!isRead && <div className='absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md'>New</div>}
      <h2 className='text-xl mb-4'>
        <span className='font-bold'>Property Inquiry:</span>&nbsp;{message.property.name}
      </h2>
      <p className='text-gray-700'>{message.body}</p>

      <ul className='mt-4'>
        <li>
          <strong>User Name:</strong> {message.sender.username}
        </li>

        <li>
          <strong>Reply Name:</strong> {message.name}
        </li>

        <li>
          <strong>Reply Email:</strong>
          <a href='mailto:{message.email}' className='text-blue-500'>
            &nbsp;{message.email}
          </a>
        </li>

        <li>
          <strong>Reply Phone:</strong>
          <a href='tel:{message.phone}' className='text-blue-500'>
            &nbsp;{getFormattedPhone(message.phone)}
          </a>
        </li>

        <li>
          <strong>Received:</strong> {getFormattedTimestamp(message.createdAt)}
        </li>
      </ul>

      <button
        onClick={handleMarkAsRead}
        className={`${isRead ? 'bg-slate-500' : 'bg-blue-500'} mt-4 mr-3 text-white py-1 px-3 rounded-md`}
      >
        Mark As {isRead ? 'New' : 'Read'}
      </button>
      <button onClick={handleDelete} className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'>
        Delete
      </button>
    </div>
  );
};
export default MessageCard;
