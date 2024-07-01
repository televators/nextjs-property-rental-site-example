import Image from 'next/image';
import Link from 'next/link';
import { FaBed, FaBath, FaRulerCombined, FaMoneyBill, FaMapMarker } from 'react-icons/fa';

const FeaturedPropertyCard = ({ property }) => {
  const { rates, _id: propertyID } = property;

  const getRateDisplay = () => {
    //#region Perf Prof Maybz
    // TODO: Profile this basic usage of Number.prototype.toLocaleString() against Intl.NumberFormat for this setup. Curious how much of an impact it is. See about generating 90 more properties for performance test.
    // return new Intl.NumberFormat( 'en-US', {
    //   style: 'currency',
    //   currency: 'USD',
    //   currencyDisplay: 'symbol'
    // } ).format( rates.nightly );
    //#endregion

    if (rates.monthly) {
      return `${'$' + rates.monthly.toLocaleString()}/mo`;
    } else if (rates.weekly) {
      return `${'$' + rates.weekly.toLocaleString()}/wk`;
    } else if (rates.nightly) {
      return `${'$' + rates.nightly.toLocaleString()}/night`;
    }
  };

  return (
    <div className='bg-white rounded-xl shadow-md relative flex flex-col md:flex-row'>
      <Image
        src={property.images[0]}
        className='object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full md:w-2/5'
        alt=''
        width={0}
        height={0}
        sizes='100vw'
      />

      <div className='flex-1 p-6'>
        <h3 className='text-xl font-bold'>{property.name}</h3>
        <div className='text-gray-600 mb-4'>{property.type}</div>

        <h3 className='absolute top-[10px] left-[10px] bg-white px-4 py-2 shadow-md rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right'>
          {getRateDisplay()}
        </h3>

        <div className='flex justify-center gap-4 text-gray-500 mb-4'>
          <p>
            <FaBed className='inline mr-1' /> {property.beds}
            <span className='md:hidden lg:inline'>&nbsp;Beds</span>
          </p>
          <p>
            <FaBath className='inline mr-1' /> {property.baths}
            <span className='md:hidden lg:inline'>&nbsp;Baths</span>
          </p>
          <p>
            <FaRulerCombined className='inline mr-1' />
            {property.square_feet} <span className='md:hidden lg:inline'>sqft</span>
          </p>
        </div>

        <div className='flex justify-center gap-4 text-green-900 text-sm mb-4'>
          {property.rates.nightly && (
            <p>
              <FaMoneyBill className='inline mr-0.5 mb-0.5' /> Nightly
            </p>
          )}
          {property.rates.weekly && (
            <p>
              <FaMoneyBill className='inline mr-0.5 mb-0.5' /> Weekly
            </p>
          )}
          {property.rates.monthly && (
            <p>
              <FaMoneyBill className='inline mr-0.5 mb-0.5' /> Monthly
            </p>
          )}
          <p>
            <i className='fa-solid fa-money-bill'></i> Nightly
          </p>
        </div>

        <div className='border border-gray-200 mb-5'></div>

        <div className='flex flex-col lg:flex-row justify-between'>
          <div className='flex align-middle gap-2 mb-4 lg:mb-0'>
            <FaMapMarker className='inline mr-0.5 mt-0.5 text-lg text-orange-700' />
            <span className='text-orange-700'>{`${property.location.city}, ${property.location.state}`}</span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm'
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};
export default FeaturedPropertyCard;
