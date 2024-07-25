import PropertyCard from '@/components/PropertyCard';
import Pagination from '@/components/all-properties/Pagination';

const PropertiesList = ({ properties, resultsCount, page, pageSize }) => {
  return (
    <section className='px-4 sm:px-6 lg:px-8 py-12'>
      <div className='container-xl lg:container m-auto'>
        {properties.length === 0 ? (
          <h2>No properties found.</h2>
        ) : (
          <>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>

            <Pagination page={page} pageSize={pageSize} resultsCount={resultsCount} />
          </>
        )}
      </div>
    </section>
  );
};
export default PropertiesList;
