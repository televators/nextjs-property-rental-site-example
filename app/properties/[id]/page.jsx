import connectDB from '@/config/database';
import Property from '@/models/Property';
import { convertToSerializableObject } from '@/utils/convertToObject';
import Link from 'next/link';
import PropertyHeaderImage from '@/components/single_property/PropertyHeaderImage';
import BackToAll from '@/components/single_property/BackToAll';
import PropertyDetails from '@/components/single_property/PropertyDetails';
import PropertyAllImages from '@/components/single_property/PropertyAllImages';
import PropertySidebar from '@/components/single_property/PropertySidebar';

const PropertyPage = async ({ params }) => {
  const PUBLIC_DOMAIN = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

  await connectDB();

  const propertyID = params.id;
  console.log('---=== Property ID ===---');
  console.log(propertyID);

  if (!propertyID || propertyID.length === 0) {
    console.error('Property ID malformed. ID: ', '\n', propertyID);

    return (
      <h1 className='text-center text-2xl font-bold mt-10'>
        Property ID doesn't exist. The property may have been deleted or the ID may have changed. Please go back to{' '}
        <Link href='/properties'>All Properties</Link> and try again.
      </h1>
    );
  }

  // Grab property from DB
  // NOTE: Using lean() makes Mongoose return plain JS object instead of first instantiating a full
  // Document from it. Faster but the object doesn't have any of the Mongoose Doc obj methods, obvs.
  // If finding a doc to perform CRUD actions on it, omit lean() and fetch the full Doc.
  const propertyEntry = await Property.findById(propertyID).lean();

  // Convert to plain JS object so it can be passed to client components
  const propertyObject = convertToSerializableObject(propertyEntry);

  console.log();

  if (!propertyObject) {
    return <h1 className='text-center text-2xl font-bold mt-10'>Property not found.</h1>;
  }

  return (
    <>
      <PropertyHeaderImage image={propertyObject.images[0]} />
      <BackToAll />

      <section className='bg-blue-50'>
        <div className='container m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
            <PropertyDetails property={propertyObject} />
            <PropertySidebar property={propertyObject} PUBLIC_DOMAIN={PUBLIC_DOMAIN} />
          </div>
        </div>
      </section>

      <PropertyAllImages images={propertyObject.images} />
    </>
  );
};

export default PropertyPage;
