import connectDB from '@/config/database';
import Property from '@/models/Property';
import { convertToSerializableObject } from '@/utils/convertToObject';
import PropertyHeaderImage from '@/components/single_property/PropertyHeaderImage';
import BackToAll from '@/components/single_property/BackToAll';
import PropertyDetails from '@/components/single_property/PropertyDetails';
import PropertyAllImages from '@/components/single_property/PropertyAllImages';
import PropertySidebar from '@/components/single_property/PropertySidebar';

const PropertyPage = async ({ params }) => {
  const PUBLIC_DOMAIN = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

  await connectDB();

  // Grab property from DB
  console.log(typeof params.id, params.id);
  const propertyEntry = await Property.findById(params.id).lean();

  // Convert to plain JS object so it can be passed to client components
  const propertyObject = convertToSerializableObject(propertyEntry);

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
            <PropertySidebar property={propertyObject} />
          </div>
        </div>
      </section>

      <PropertyAllImages images={propertyObject.images} />
    </>
  );
};

export default PropertyPage;
