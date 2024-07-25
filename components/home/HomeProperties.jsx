import connectDB from '@/config/database';
import Property from '@/models/Property';
import { convertToSerializableObject } from '@/utils/convertToObject';
import Link from 'next/link';
import PropertyCard from '@/components/PropertyCard';

const HomeProperties = async () => {
  await connectDB();

  const recentPropertyEntries = await Property.find({}).sort({ createdAt: -1 }).limit(3).lean();
  const recentProperties = [];

  recentPropertyEntries.map((property) => {
    const propertyObject = convertToSerializableObject(property);
    recentProperties.push(propertyObject);
  });

  return (
    <>
      <section className='px-4 sm:px-6 lg:px-8 py-6'>
        <div className='container-xl lg:container m-auto'>
          <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>Recent Properties</h2>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {recentProperties.length === 0 ? (
              <p>No properties found.</p>
            ) : (
              recentProperties.map((property) => <PropertyCard key={property._id} property={property} />)
            )}
          </div>
        </div>
      </section>

      <section className='m-auto max-w-lg my-10 px-4 sm:px-6 lg:px-8'>
        <Link
          href='/properties'
          className='block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700'
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};
export default HomeProperties;
