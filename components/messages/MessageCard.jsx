'use client';
import { useState } from 'react';
import getFormattedTimestamp from '@/utils/getFormattedTimestamp';
import getFormattedPhone from '@/utils/getFormattedPhone';
import { toast } from 'react-toastify';

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [wasDeleted, setWasDeleted] = useState(false);

  const handleMarkAsRead = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'PUT',
      });

      if (res.status === 200) {
        const read = await res.json();
        setIsRead(read);
        toast.success(`Message marked as ${isRead ? "'unread'" : "'read'"}.`);
      } else if (res.status > 200) {
        // API route returns standardized message property in response object for all
        // pertinent statuses; consume them here instead of hardcoding messages redundantly.
        const resMessage = await res.json().then((data) => data.message);

        console.error(resMessage);
        toast.error("There was an error changing message's status. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("There was an error changing message's status. Please try again.");
    }
  };
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'DELETE',
      });

      if (res.status === 200) {
        setWasDeleted(true);
        toast.success('Message deleted successfully.');
      } else if (res.status >= 400 && res.status <= 499) {
        toast.error('There was an error deleting the message.');
      } else if (res.status === 500) {
        toast.error('Server encountered an error, message may not have been deleted.');
      }
    } catch (error) {
      console.error(error);
      toast.error('There was an error deleting the message. Please try again.');
    }
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
        className={`${isRead ? 'bg-slate-500' : 'bg-blue-500'} mt-4 mr-3 text-white py-1 px-3 rounded-md`}>
        Mark As {isRead ? 'Unread' : 'Read'}
      </button>
      <button onClick={handleDelete} className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'>
        Delete
      </button>
    </div>
  );
};
export default MessageCard;
