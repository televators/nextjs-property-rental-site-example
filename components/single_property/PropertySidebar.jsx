import BookmarkButton from '@/components/single_property/BookmarkButton';
import ShareButtons from '@/components/single_property/ShareButtons';
import PropertyContactForm from '@/components/single_property/PropertyContactForm';

const PropertySidebar = ({ property }) => {
  return (
    <aside className='space-y-4'>
      <BookmarkButton property={property} />
      <ShareButtons property={property} />

      <PropertyContactForm property={property} />
    </aside>
  );
};
export default PropertySidebar;
