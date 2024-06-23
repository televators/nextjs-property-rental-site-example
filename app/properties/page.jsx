import PropertyCard from '@/components/PropertyCard';
import { fetchProperties } from '@/utils/request';
import SearchPropertyForm from '@/components/SearchPropertyForm';

const PropertiesPage = async () => {
  const properties = await fetchProperties();

  // Sort properties by date
  properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      <section className='px-4 py-6 bg-blue-700'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <h1 className='text-3xl font-bold text-white mb-6 text-center'>All Properties</h1>

          {/* Search Form */}
          <SearchPropertyForm />
        </div>
      </section>

      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          {properties.length === 0 ? (
            <h2>No properties found.</h2>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default PropertiesPage;
