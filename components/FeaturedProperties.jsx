import { fetchProperties } from '@/utils/request';
import Image from 'next/image';
import Link from 'next/link';
import { FaBed, FaBath, FaRulerCombined, FaMoneyBill, FaMapMarker } from 'react-icons/fa';

const FeaturedProperties = async ({ featuredCount }) => {
  const properties = await fetchProperties({ showFeatured: true });

  if (!properties || properties.length <= 0) return null;

  return (
    <section className='bg-blue-50 px-4 pt-6 pb-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>Featured Properties</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {properties.map((property) => (
            <div key={property._id} className='bg-white rounded-xl shadow-md relative flex flex-col md:flex-row'>
              <Image
                src={property.images[0]}
                className='object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full md:w-2/5'
                alt=''
                width={0}
                height={0}
                sizes='100vw'
              />

              <div className='p-6'>
                <h3 className='text-xl font-bold'>{property.name}</h3>
                <div className='text-gray-600 mb-4'>{property.type}</div>
                <h3 className='absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right'>
                  $2,500/wk
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
                    <i className='fa-solid fa-location-dot text-lg text-orange-700'></i>
                    <span className='text-orange-700'> Boston MA </span>
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
          ))}
        </div>
      </div>
    </section>
  );
};
export default FeaturedProperties;
