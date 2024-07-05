import connectDB from '@/config/database';
import Property from '@/models/Property';
import SearchPropertyForm from '@/components/SearchPropertyForm';
import PropertiesList from '@/components/all-properties/PropertiesList';
import { convertToSerializableObject } from '@/utils/convertToObject';

const PropertiesPage = async ({ searchParams: { pageSize = 6, page = 1 } }) => {
  await connectDB();

  const skip = (page - 1) * pageSize;

  const resultsCount = await Property.countDocuments({});
  const propertyDocs = await Property.find({}).skip(skip).limit(pageSize).lean();
  const properties = [...propertyDocs].map((propertyDoc) => {
    const property = convertToSerializableObject(propertyDoc);
    property._id = convertToSerializableObject(propertyDoc._id);
    property.owner = convertToSerializableObject(propertyDoc.owner);

    return property;
  });

  return (
    <>
      <section className='px-4 py-6 bg-blue-700'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <h1 className='text-3xl font-bold text-white mb-6 text-center'>All Properties</h1>

          <SearchPropertyForm />
        </div>
      </section>

      <PropertiesList
        properties={properties}
        resultsCount={resultsCount}
        page={parseInt(page)}
        pageSize={parseInt(pageSize)}
      />
    </>
  );
};

export default PropertiesPage;
