import InfoBox from '../InfoBox';

const InfoBoxes = () => {
  return (
    <section className='px-4 sm:px-6 lg:px-8 pt-6 pb-10'>
      <div className='container-xl lg:container m-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 rounded-lg'>
          <InfoBox
            heading='For Renters'
            backgroundColor='bg-gray-100'
            buttonInfo={{
              link: '/properties',
              text: 'Browse Properties',
              backgroundColor: 'bg-black',
            }}
          >
            Find your dream rental property. Bookmark properties and contact owners.
          </InfoBox>
          <InfoBox
            heading='For Property Owners'
            backgroundColor='bg-blue-100'
            buttonInfo={{
              link: '/properties/add',
              text: 'Add Property',
              backgroundColor: 'bg-blue-500',
            }}
          >
            List your properties and reach potential tenants. Rent as an airbnb or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  );
};
export default InfoBoxes;
