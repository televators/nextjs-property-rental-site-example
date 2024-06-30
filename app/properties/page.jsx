import SearchPropertyForm from '@/components/SearchPropertyForm';
import PropertiesList from '@/components/all-properties/PropertiesList';

const PropertiesPage = () => {
  return (
    <>
      <section className='px-4 py-6 bg-blue-700'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <h1 className='text-3xl font-bold text-white mb-6 text-center'>All Properties</h1>

          <SearchPropertyForm />
        </div>
      </section>

      <PropertiesList />
    </>
  );
};

export default PropertiesPage;
