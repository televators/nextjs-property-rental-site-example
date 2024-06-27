import Link from 'next/link';
import BookmarkButton from '@/components/single_property/BookmarkButton';
import ShareButtons from '@/components/single_property/ShareButtons';
import PropertyContactForm from '@/components/single_property/PropertyContactForm';

const PropertySidebar = ({ property, PUBLIC_DOMAIN, userOwnsCurrentProperty }) => {
  return (
    <aside className='space-y-4'>
      <BookmarkButton property={property} />
      <ShareButtons property={property} PUBLIC_DOMAIN={PUBLIC_DOMAIN} />

      {userOwnsCurrentProperty ? (
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h3 className='font-bold mb-4'>You own this property.</h3>
          <Link
            href={`/properties/${property._id}/edit`}
            className='inline-block bg-blue-500 text-white px-3 py-2 rounded-md mb-2 mr-2 hover:bg-blue-600 text-nowrap'>
            Edit this property
          </Link>

          <Link
            href='/profile'
            className='inline-block bg-blue-700 text-white px-3 py-2 rounded-md mr-2 hover:bg-blue-600 text-nowrap'>
            Manage all properties
          </Link>
        </div>
      ) : (
        <PropertyContactForm property={property} />
      )}
    </aside>
  );
};
export default PropertySidebar;
