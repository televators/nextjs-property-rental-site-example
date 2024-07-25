'use client';
import { toast } from 'react-toastify';
import states from '@/utils/usStateList';
import { validPropertyTypes } from '@/config/validPropertyTypes';
import addProperty from '@/app/actions/addProperty';
import SubmitButton from './SubmitButton';
import AmenitiesList from './AmenitiesList';

const AddPropertyForm = () => {
  const handleImageChange = (e) => {
    const { files } = e.target;

    // Limit user to 4 images
    if (files.length > 4) {
      e.target.value = '';
      toast.error('Please select a maximum of 4 images.');
    }
  };

  return (
    <form action={addProperty}>
      <h2 className='text-3xl text-center font-semibold mb-6'>Add Property</h2>

      {/* Property Type */}
      <div className='mb-4'>
        <label htmlFor='type' className='block text-gray-700 font-bold mb-2'>
          Property Type
        </label>
        <select id='type' name='type' className='border rounded w-full py-2 px-3' required>
          {validPropertyTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
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
        />

        <input
          type='text'
          id='city'
          name='location.city'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='City'
          required
        />

        <select id='state' name='location.state' className='border rounded w-full py-2 px-3 mb-2' required>
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
          />
        </div>
      </div>

      {/* Amenities */}
      <div className='mb-4'>
        <label className='block text-gray-700 font-bold mb-2'>Amenities</label>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
          <AmenitiesList />
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
          autoComplete='name'
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
          autoComplete='tel-national'
        />
      </div>

      {/* Images */}
      <div className='mb-4'>
        <label htmlFor='images' className='block text-gray-700 font-bold mb-2'>
          Images (Select up to 4 images)
        </label>
        <input
          type='file'
          id='images'
          name='images'
          className='border rounded w-full py-2 px-3'
          accept='image/*'
          multiple
          required
          onChange={handleImageChange}
        />
      </div>

      {/* Set Featured Flag */}
      <div className='mb-4'>
        <label htmlFor='featured' className='block text-gray-700 font-bold mb-2'>
          Featured Property
          <input type='checkbox' id='featured' name='featured' defaultChecked={false} className='ml-2' />
        </label>
      </div>

      {/* Submit Button */}
      <div>
        <SubmitButton />
      </div>
    </form>
  );
};
export default AddPropertyForm;
