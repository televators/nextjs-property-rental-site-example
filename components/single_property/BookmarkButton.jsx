'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { FaBookmark } from 'react-icons/fa';
import checkBookmarkStatus from '@/app/actions/checkBookmarkStatus';
import bookmarkProperty from '@/app/actions/bookmarkProperty';

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userID = session?.user?.id;
  const propertyID = property._id;

  // Loading just used to show placeholder bookmark button
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(null);
  const buttonVariant = {
    color: isBookmarked ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600',
    text: isBookmarked ? 'Remove Bookmark' : 'Bookmark Property',
  };

  useEffect(() => {
    if (!userID) {
      setLoading(false);
      setIsBookmarked(false);

      return;
    }

    checkBookmarkStatus(propertyID).then((res) => {
      if (res.error) toast.error(res.error);

      if (res.isBookmarked) setIsBookmarked(res.isBookmarked);

      setLoading(false);
    });
  }, [userID]);

  const handleClick = async () => {
    if (!userID) return toast.error('Please sign in to bookmark properties.');

    bookmarkProperty(propertyID).then((res) => {
      if (res.error) return toast.error(res.error);

      setIsBookmarked(res.isBookmarked);
      toast.success(res.message);
    });
  };

  return loading ? (
    <button
      disabled
      className='bg-gray-500 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
    >
      Checking bookmark...
    </button>
  ) : (
    <button
      onClick={handleClick}
      className={`${buttonVariant.color} text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center`}
    >
      <FaBookmark className='mr-2' /> {buttonVariant.text}
    </button>
  );
};
export default BookmarkButton;
