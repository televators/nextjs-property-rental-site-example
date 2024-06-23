'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertyCard from '@/components/PropertyCard';
import Spinner from '@/components/Spinner';
import BackToAll from '@/components/single_property/BackToAll';
import SearchPropertyForm from '@/components/SearchPropertyForm';

const PropertySearchResultsPage = () => {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = searchParams.get('s');
  const type = searchParams.get('property-type');

  useEffect(() => {
    const getResults = async () => {
      try {
        const res = await fetch(`/api/properties/search?s=${query}&property-type=${type}`);

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getResults();
  }, [query, type]);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
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
