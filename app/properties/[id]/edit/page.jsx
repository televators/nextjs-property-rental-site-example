import connectDB from '@/config/database';
import Property from '@/models/Property';
import { convertToSerializableObject } from '@/utils/convertToObject';
import EditPropertyForm from '@/components/add-edit-property/EditPropertyForm';

const EditPropertyPage = async ({ params }) => {
  await connectDB();

  const propertyDocument = await Property.findById(params.id).lean();
  const property = convertToSerializableObject(propertyDocument);

  if (!property) {
    return <h1 className='text-center text-2xl font-bold mt-10'>Property not found.</h1>;
  }

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <EditPropertyForm property={property} />
        </div>
      </div>
    </section>
  );
};
export default EditPropertyPage;
