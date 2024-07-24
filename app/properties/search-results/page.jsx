import connectDB from '@/config/database';
import Property from '@/models/Property';
import { convertToSerializableObject } from '@/utils/convertToObject';
import PropertyCard from '@/components/PropertyCard';
import BackToAll from '@/components/single_property/BackToAll';
import SearchPropertyForm from '@/components/SearchPropertyForm';

const PropertySearchResultsPage = async ({ searchParams }) => {
  await connectDB();

  const query = searchParams['s'];
  const type = searchParams['property-type'];

  const queryPattern = new RegExp(query, 'i');
  // Match keyword(s) against Property fields
  let queryMatch = {
    $or: [
      { name: queryPattern },
      { description: queryPattern },
      { 'location.street': queryPattern },
      { 'location.city': queryPattern },
      { 'location.state': queryPattern },
      { 'location.zipcode': queryPattern },
    ],
  };

  // Only check for property type if not 'All'
  if (type && type !== 'All') {
    const typePattern = new RegExp(type, 'i');
    queryMatch.type = typePattern;
  }

  const propertyDocs = await Property.find(queryMatch).lean();
  const properties = [...propertyDocs].map(convertToSerializableObject);

  return (
    <>
      {/* Search Form */}
      <div className='bg-blue-700 py-6 mb-4'>
        <SearchPropertyForm />
      </div>

      {/* Results */}
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <BackToAll withWrapper={false} />

          <h1 className='text-2xl mb-4'>Search results</h1>

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
export default PropertySearchResultsPage;
