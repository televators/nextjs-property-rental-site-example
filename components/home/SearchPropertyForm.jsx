'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import Property from '@/models/Property';
import getValidPropertyTypes from '@/utils/getValidPropertyTypes';

const SearchPropertyForm = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('All');
  // const [validPropertyTypes, setValidPropertyTypes] = useState(null);
  const validPropertyTypes = getValidPropertyTypes();

  // useEffect(() => {
  //   console.log('Made it to the useEffect...');

  //   async function shibby() {
  //     try {
  //       // const typesArray = Property.schema.path('type').enumValues;
  //       const typesArray = getValidPropertyTypes();

  //       console.log('typesArray: ', typesArray);

  //       setValidPropertyTypes(typesArray);
  //     } catch (error) {
  //       console.log('Shit balls. Almost there.');
  //       console.error(error);
  //     }
  //   }

  //   shibby();
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchQuery.length === 0 && searchType === 'All') {
      router.push('/properties');
    } else {
      const queryString = `?s=${searchQuery}&property-type=${searchType}`;
      router.push(`/properties/search-results${queryString}`);
    }
  };

  return (
    <form className='mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center' onSubmit={handleSubmit}>
      <div className='w-full md:w-3/5 md:pr-2 mb-4 md:mb-0'>
        <label htmlFor='search' className='sr-only'>
          Search for rentals
        </label>

        <input
          type='text'
          id='search'
          placeholder='Enter Keywords or Location'
          className='w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className='w-full md:w-2/5 md:pl-2'>
        <label htmlFor='property-type' className='sr-only'>
          Select property type
        </label>

        <select
          id='property-type'
          className='w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500'
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}>
          <option value='All'>All</option>
          {validPropertyTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <button
        type='submit'
        className='md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500'>
        Search
      </button>
    </form>
  );
};
export default SearchPropertyForm;
