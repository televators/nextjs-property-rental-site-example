'use client';
import { useState, useEffect } from 'react';
import PropertyCard from '@/components/PropertyCard';
import Spinner from '@/components/Spinner';

const PropertiesList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  // TODO: Before launch, set initial pageSize to 9 so the page loads a full page at first, then set pageSize to 3 or 6 after initial load. Will have to add like fifteen more properties to DB.
  // const [pageSize, setPageSize] = useState(9);
  const [pageSize, setPageSize] = useState(3);
  const [resultsCount, setResultsCount] = useState(0);

  useEffect(() => {
    const getProperties = async () => {
      try {
        const res = await fetch(`/api/properties?page=${page}&page-size=${pageSize}`);

        if (res.status !== 200) {
          // TODO: Redo to better match how we're handling fetch issues elsewhere.
          throw new Error('Failed to get properties.');
        }

        const data = await res.json();
        // TODO: Before refactor, I had the properties sorted by date and was using that fetchProperties() util func in utils/request.js. Figure out best way to add back in date sorting and whether to refactor *this* to use global fetchProperties util.
        setProperties(data.properties);
        // TODO: Before launch, enable this along with alt pageSize init value above.
        // setPageSize(3);
        setResultsCount(data.propertiesCount);
      } catch (error) {
        console.error('Error fetching properties.', '\n', error);
      } finally {
        setLoading(false);
      }
    };

    getProperties();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
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
  );
};
export default PropertiesList;
