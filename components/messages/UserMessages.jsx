'use client';
import { useState, useEffect } from 'react';
import getFormattedTimestamp from '@/utils/getFormattedTimestamp';
import getFormattedPhone from '@/utils/getFormattedPhone';
import Spinner from '@/components/Spinner';

const UserMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch('/api/messages');

        if (res.status === 200) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (error) {
        console.error('Error fetching user messages:', '\n', error);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, []);

  const handleMarkAsRead = async () => {};
  const handleDelete = async () => {};

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-24 max-w-6xl'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Messages</h1>
          {loading ? (
            <Spinner />
          ) : messages.length > 0 ? (
            messages.map((message) => (
              <div key={message._id} className='relative bg-white p-4 rounded-md shadow-md border border-gray-200'>
                <h2 className='text-xl mb-4'>
                  <span className='font-bold'>Property Inquiry:</span>&nbsp; Boston Commons Retreat
                </h2>
                <p className='text-gray-700'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati libero nobis vero quos aspernatur
                  nemo alias nam, odit dolores sed quaerat illum impedit quibusdam officia ad voluptatibus molestias
                  sequi? Repudiandae!
                </p>

                <ul className='mt-4'>
                  <li>
                    <strong>Name:</strong> {message.name}
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

                <button onClick={handleMarkAsRead} className='mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md'>
                  Mark As Read
                </button>
                <button onClick={handleDelete} className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'>
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No messages.</p>
          )}
        </div>
      </div>
    </section>
  );
};
export default UserMessages;
