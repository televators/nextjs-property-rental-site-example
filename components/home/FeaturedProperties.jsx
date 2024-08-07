import Property from '@/models/Property';
import FeaturedPropertyCard from '../FeaturedPropertyCard';

const FeaturedProperties = async ({ featuredCount }) => {
  const properties = await Property.find({ is_featured: true }).limit(featuredCount).lean();

  if (!properties || properties.length <= 0) return null;

  return (
    <section className='bg-blue-50 px-4 sm:px-6 lg:px-8 pt-8 pb-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>Featured Properties</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {properties.map((property) => (
            <FeaturedPropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default FeaturedProperties;
