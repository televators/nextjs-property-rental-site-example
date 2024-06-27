import BookmarkButton from '@/components/single_property/BookmarkButton';
import ShareButtons from '@/components/single_property/ShareButtons';
import PropertyContactForm from '@/components/single_property/PropertyContactForm';

const PropertySidebar = ({ property, PUBLIC_DOMAIN }) => {
  return (
    <aside className='space-y-4'>
      <BookmarkButton property={property} />
      <ShareButtons property={property} PUBLIC_DOMAIN={PUBLIC_DOMAIN} />

      <PropertyContactForm property={property} />
    </aside>
  );
};
export default PropertySidebar;
