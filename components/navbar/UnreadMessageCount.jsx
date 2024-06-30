'use client';
import { useEffect } from 'react';
import { useGlobalContext } from '@/context/GlobalContext';

const UnreadMessageCount = ({ session }) => {
  const { unreadCount, setUnreadCount } = useGlobalContext();

  useEffect(() => {
    if (!session) return;

    const getUnreadCount = async () => {
      try {
        const res = await fetch('/api/messages/unread-count');

        if (res.status === 200) {
          const count = await res.json();
          setUnreadCount(count);
        }
      } catch (error) {
        console.error('Error getting unread message count.', '\n', error);
      }
    };

    getUnreadCount();
  }, []);

  if (unreadCount <= 0) return null;

  return (
    <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
      {unreadCount}
    </span>
  );
};
export default UnreadMessageCount;
