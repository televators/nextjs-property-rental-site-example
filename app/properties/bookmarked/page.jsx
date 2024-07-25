import connectDB from '@/config/database';
// HACK: Prevents random and infrequent issue where Mongoose loads things out of order.
import Property from '@/models/Property';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';
import PropertyCard from '@/components/PropertyCard';
import { convertToSerializableObject } from '@/utils/convertToObject';

const BookmarkedProperties = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();

  const { bookmarks: bookmarkEntries } = await User.findById(sessionUser.userID).populate('bookmarks').lean();
  const bookmarkObjects = [];

  bookmarkEntries.map((bookmark) => {
    const bookmarkObject = convertToSerializableObject(bookmark);
    bookmarkObjects.push(bookmarkObject);
  });

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        <h1 className='text-2xl mb-4'>Your Bookmarked Properties</h1>
        {bookmarkObjects.length === 0 ? (
          <p>No bookmarked properties.</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {bookmarkObjects.map((property) => (
              <PropertyCard key={property._id} property={property} enableBookmarkToggle={true} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default BookmarkedProperties;
