'use client';
import { useState, useEffect } from 'react';
import Spinner from '@/components/Spinner';
import MessageCard from './MessageCard';

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
          console.log(data[0]);
        }
      } catch (error) {
        console.error('Error fetching user messages:', '\n', error);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, []);

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-24 max-w-6xl'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Messages</h1>
          {loading ? (
            <Spinner />
          ) : messages.length > 0 ? (
            messages.map((message) => <MessageCard key={message._id} message={message} />)
          ) : (
            <p>No messages.</p>
          )}
        </div>
      </div>
    </section>
  );
};
export default UserMessages;
