'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { FaBookmark } from 'react-icons/fa';

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userID = session?.user?.id;
  const propertyID = property._id;

  const [bookmarkFound, setBookmarkFound] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(null);
  const buttonVariant = {
    color: isBookmarked ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600',
    text: isBookmarked ? 'Remove Bookmark' : 'Bookmark Property',
  };

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      try {
        const res = await fetch(`/api/bookmarks/${propertyID}`);

        if (res.status === 200) {
          const { isBookmarked } = await res.json();
          setBookmarkFound(true);
          setIsBookmarked(isBookmarked);
        }
      } catch (error) {
        console.error(error);
        toast.error('Error while checking bookmark status.');
      }
    };

    fetchBookmarkStatus();
  }, []);

  const handleClick = async () => {
    if (!userID) {
      toast.error('Please sign in to bookmark properties.');
    } else {
      try {
        const res = await fetch(`/api/bookmarks/${propertyID}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            propertyId: propertyID,
          }),
        });

        if (res.status === 200) {
          const data = await res.json();
          toast.success(data.message);
          setIsBookmarked(data.isBookmarked);
        }
      } catch (error) {
        console.error(error);
        toast.error('Error trying to bookmark property.');
      }
    }
  };

  return !bookmarkFound ? (
    <button
      disabled
      className='bg-gray-500 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'>
      Checking bookmark...
    </button>
  ) : (
    <button
      onClick={handleClick}
      className={`${buttonVariant.color} text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center`}>
      <FaBookmark className='mr-2' /> {buttonVariant.text}
    </button>
  );
};
export default BookmarkButton;
