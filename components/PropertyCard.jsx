'use client';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { FaBed, FaBath, FaRulerCombined, FaMoneyBill, FaMapMarker, FaBookmark } from 'react-icons/fa';

// enableBookmarkToggle is only used on the user's All Bookmarks page at /properties/bookmarks
const PropertyCard = ({ property, enableBookmarkToggle }) => {
  const { rates, _id: propertyID } = property;

  // TODO: Finish going through and refactoring to use server actions instead of all the API endpoints for Bookmarks.
  // This is used on the All Bookmarks page for signed-in users. Users can delete properties from the page but since the page is a server component
  // const [wasRemoved, setWasRemoved] = useState(false);

  const getRateDisplay = () => {
    if (rates.monthly) {
      return `${'$' + rates.monthly.toLocaleString()}/mo`;
    } else if (rates.weekly) {
      return `${'$' + rates.weekly.toLocaleString()}/wk`;
    } else if (rates.nightly) {
      return `${'$' + rates.nightly.toLocaleString()}/night`;
    }
  };

  const handleClick = async () => {
    try {
      const res = await fetch(`/api/bookmarks/${propertyID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyId: propertyID,
        }),
      });

      if (res.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      toast.error('Error trying to remove bookmarked property.');
    }
  };

  return (
    <div className='rounded-xl shadow-md relative'>
      <Image
        className='w-full h-auto rounded-t-xl aspect-[3/2] object-cover'
        src={property.images[0]}
        alt=''
        width={0}
        height={0}
        sizes='100vw'
        priority={true}
      />

      <div className='p-4'>
        <div className='text-left md:text-center lg:text-left mb-6'>
          <div className='text-gray-600'>{property.type}</div>
          <h3 className='text-xl font-bold mb-0.5'>{property.name}</h3>

          <div className='flex align-middle gap-2 mb-4 lg:mb-0'>
            <FaMapMarker className='inline text-lg text-orange-700 mt-0.5' />
            <span className='text-orange-700'>{property.location.city + ', ' + property.location.state}</span>
          </div>
        </div>

        <h3 className='absolute top-[10px] right-[10px] bg-white shadow-md px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right'>
          {getRateDisplay()}
        </h3>

        <div className='flex justify-center gap-4 text-gray-500 mb-4'>
          <p>
            <FaBed className='inline mr-1' /> {property.beds}
            <span className='md:hidden lg:inline'>Beds</span>
          </p>
          <p>
            <FaBath className='inline mr-1' /> {property.baths}
            <span className='md:hidden lg:inline'>Baths</span>
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
        </div>

        <div className='border border-gray-100 mb-5'></div>

        <div className='flex flex-col lg:flex-row justify-end gap-3'>
          <Link
            href={`/properties/${property._id}`}
            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-md'
          >
            Details
          </Link>

          {enableBookmarkToggle && (
            <button
              onClick={handleClick}
              className={`bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-2 px-4 rounded-lg flex items-center justify-center`}
            >
              <FaBookmark className='mr-2' /> Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default PropertyCard;
