'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import deleteProperty from '@/app/actions/deleteProperty';

const ProfileProperties = ({ properties: initialProperties }) => {
  const [properties, setProperties] = useState(initialProperties);

  // TODO: This is black box action. No error handling, just implicitly assuming it works every time and there will never be an issue on the server. Fix it.
  const handleDeleteProperty = async (propertyID) => {
    const confirmed = window.confirm('Are you sure you want to delete this property listing?');

    if (!confirmed) return;

    await deleteProperty(propertyID);

    toast.success('Property listing deleted successfully.');

    // Remove deleted property from UI
    const updatedProperties = properties.filter((property) => property._id !== propertyID);
    // const updatedProperties = properties.filter((property) => property._id !== id);
    setProperties(updatedProperties);
  };

  return properties.map((property) => {
    const {
      _id: ID,
      name,
      location: { street, city, state, zipcode },
      images,
    } = property;

    return (
      <div key={ID} className='mb-10'>
        <Link href={`/properties/${ID}`}>
          <Image
            className='h-32 w-full rounded-md object-cover'
            src={images[0]}
            alt=''
            width={0}
            height={0}
            sizes='100vw'
          />
        </Link>

        <div className='mt-2'>
          <p className='text-lg font-semibold'>{name}</p>
          <p className='text-gray-600'>Address: {`${street}, ${city}, ${state} ${zipcode}`}</p>
        </div>

        <div className='mt-2'>
          <Link
            href={`/properties/${ID}/edit`}
            className='bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600'
          >
            Edit
          </Link>

          <button
            className='bg-red-500 text-white px-3 py-3 rounded-md hover:bg-red-600'
            type='button'
            onClick={() => handleDeleteProperty(ID)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  });
};
export default ProfileProperties;
