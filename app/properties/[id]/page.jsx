'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchProperty } from '@/utils/request';
import PropertyHeaderImage from '@/components/single_property/PropertyHeaderImage';
import BackToAll from '@/components/single_property/BackToAll';
import PropertyDetails from '@/components/single_property/PropertyDetails';
import PropertyAllImages from '@/components/single_property/PropertyAllImages';
import PropertySidebar from '@/components/single_property/PropertySidebar';
import Spinner from '@/components/Spinner';

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;

      try {
        const property = await fetchProperty(id);
        setProperty(property);
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };

    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property]);

  if (!property && !loading) {
    return <h1 className='text-center text-2xl font-bold mt-10'>Property not found.</h1>;
  }

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <BackToAll />

          <section className='bg-blue-50'>
            <div className='container m-auto py-10 px-6'>
              <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
                <PropertyDetails property={property} />
                <PropertySidebar property={property} />
              </div>
            </div>
          </section>

          <PropertyAllImages images={property.images} />
        </>
      )}
    </>
  );
};

export default PropertyPage;
