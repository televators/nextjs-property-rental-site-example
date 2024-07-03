import editProperty from '@/app/actions/editProperty';
import states from '@/utils/usStateList';
import AmenitiesList from '@/components/add-edit-property/AmenitiesList';
import SubmitButton from '@/components/add-edit-property/SubmitButton';

const EditPropertyForm = ({ property }) => {
  // Use Function.bind() to pass property ID to server action.
  const updatePropertyById = editProperty.bind(null, property._id);

  // Check for null values and replace with empty string so the rendered input has a value attribute.
  if (property.rates) {
    for (const rate in property.rates) {
      if (property.rates[rate] === null) {
        property.rates[rate] = '';
      }
    }
  }

  return (
    <form action={updatePropertyById}>
      <h2 className='text-3xl text-center font-semibold mb-6'>Edit Property</h2>

      {/* Property Type */}
      <div className='mb-4'>
        <label htmlFor='type' className='block text-gray-700 font-bold mb-2'>
          Property Type
        </label>
        <select id='type' name='type' className='border rounded w-full py-2 px-3' required defaultValue={property.type}>
          <option value='Apartment'>Apartment</option>
          <option value='Condo'>Condo</option>
          <option value='House'>House</option>
          <option value='Cabin Or Cottage'>Cabin or Cottage</option>
          <option value='Room'>Room</option>
          <option value='Studio'>Studio</option>
          <option value='Other'>Other</option>
        </select>
      </div>

      {/* Listing Name */}
      <div className='mb-4'>
        <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>
          Listing Name
        </label>
        <input
          type='text'
          id='name'
          name='name'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='eg. Beautiful Apartment In Miami'
          required
          defaultValue={property.name}
        />
      </div>

      {/* Description */}
      <div className='mb-4'>
        <label htmlFor='description' className='block text-gray-700 font-bold mb-2'>
          Description
        </label>
        <textarea
          id='description'
          name='description'
          className='border rounded w-full py-2 px-3'
          rows='4'
          placeholder='Add an optional description of your property'
          defaultValue={property.description}
        ></textarea>
      </div>

      {/* Location */}
      <div className='mb-4 bg-blue-50 p-4'>
        <label htmlFor='street' className='block text-gray-700 font-bold mb-2'>
          Location
        </label>

        <input
          type='text'
          id='street'
          name='location.street'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='Street'
          defaultValue={property.location.street}
        />

        <input
          type='text'
          id='city'
          name='location.city'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='City'
          required
          defaultValue={property.location.city}
        />

        <select
          id='state'
          name='location.state'
          className='border rounded w-full py-2 px-3 mb-2'
          required
          defaultValue={property.location.state}
        >
          {Object.keys(states).map((name) => (
            <option key={states[name]} value={states[name]}>
              {name}
            </option>
          ))}
        </select>

        <input
          type='text'
          id='zipcode'
          name='location.zipcode'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='Zipcode'
          defaultValue={property.location.zipcode}
        />
      </div>

      {/* Beds, Baths, Square Feet */}
      <div className='mb-4 flex flex-wrap'>
        <div className='w-full sm:w-1/3 pr-2'>
          <label htmlFor='beds' className='block text-gray-700 font-bold mb-2'>
            Beds
          </label>
          <input
            type='number'
            min='1'
            step='1'
            id='beds'
            name='beds'
            className='border rounded w-full py-2 px-3'
            required
            defaultValue={property.beds}
          />
        </div>
        <div className='w-full sm:w-1/3 px-2'>
          <label htmlFor='baths' className='block text-gray-700 font-bold mb-2'>
            Baths
          </label>
          <input
            type='number'
            min='1'
            step='1'
            id='baths'
            name='baths'
            className='border rounded w-full py-2 px-3'
            required
            defaultValue={property.baths}
          />
        </div>
        <div className='w-full sm:w-1/3 pl-2'>
          <label htmlFor='square_feet' className='block text-gray-700 font-bold mb-2'>
            Square Feet
          </label>
          <input
            type='number'
            min='1'
            step='1'
            id='square_feet'
            name='square_feet'
            className='border rounded w-full py-2 px-3'
            required
            defaultValue={property.square_feet}
          />
        </div>
      </div>

      {/* Amenities */}
      <div className='mb-4'>
        <label className='block text-gray-700 font-bold mb-2'>Amenities</label>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
          <AmenitiesList currentAmenities={property.amenities} />
        </div>
      </div>

      {/* Rates */}
      <div className='mb-4 bg-blue-50 p-4'>
        <label className='block text-gray-700 font-bold mb-2'>Rates (Leave blank if not applicable)</label>
        <div className='flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4'>
          <div className='flex items-center'>
            <label htmlFor='nightly_rate' className='mr-2'>
              Nightly
            </label>
            <input
              type='number'
              min='0.01'
              step='0.01'
              id='nightly_rate'
              name='rates.nightly'
              className='border rounded w-full py-2 px-3'
              defaultValue={property.rates.nightly}
            />
          </div>

          <div className='flex items-center'>
            <label htmlFor='weekly_rate' className='mr-2'>
              Weekly
            </label>
            <input
              type='number'
              min='0.01'
              step='0.01'
              id='weekly_rate'
              name='rates.weekly'
              className='border rounded w-full py-2 px-3'
              defaultValue={property.rates.weekly}
            />
          </div>

          <div className='flex items-center'>
            <label htmlFor='monthly_rate' className='mr-2'>
              Monthly
            </label>
            <input
              type='number'
              min='0.01'
              step='0.01'
              id='monthly_rate'
              name='rates.monthly'
              className='border rounded w-full py-2 px-3'
              defaultValue={property.rates.monthly}
            />
          </div>
        </div>
      </div>

      {/* Seller Info */}
      <div className='mb-4'>
        <label htmlFor='seller_name' className='block text-gray-700 font-bold mb-2'>
          Seller Name
        </label>
        <input
          type='text'
          id='seller_name'
          name='seller_info.name'
          className='border rounded w-full py-2 px-3'
          placeholder='Name'
          defaultValue={property.seller_info.name}
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='seller_email' className='block text-gray-700 font-bold mb-2'>
          Seller Email
        </label>
        <input
          type='email'
          id='seller_email'
          name='seller_info.email'
          className='border rounded w-full py-2 px-3'
          placeholder='Email address'
          required
          defaultValue={property.seller_info.email}
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='seller_phone' className='block text-gray-700 font-bold mb-2'>
          Seller Phone
        </label>
        <input
          type='tel'
          id='seller_phone'
          name='seller_info.phone'
          className='border rounded w-full py-2 px-3'
          placeholder='Phone'
          defaultValue={property.seller_info.phone}
        />
      </div>

      {/* Submit Button */}
      <div>
        <SubmitButton pendingText='Saving property...' text='Save Property' />
      </div>
    </form>
  );
};
export default EditPropertyForm;
