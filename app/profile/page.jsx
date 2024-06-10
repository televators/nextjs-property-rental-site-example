'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';
import profileDefault from '@/assets/images/profile.png';

const ProfilePage = () => {
  const { data: session } = useSession();
  const profileName = session?.user?.name || "[Couldn't retrieve user's name]";
  const profileEmail = session?.user?.email || "[Couldn't retrieve user's email]";
  const profileImage = session?.user?.image || profileDefault;

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProperties = async (userId) => {
      if (!userId) return;

      try {
        const res = await fetch(`/api/properties/user/${userId}`);

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // When session is available, fetch all current user's properties
    if (session?.user?.id) {
      fetchUserProperties(session.user.id);
    }
  }, [session]);

  const handleDeleteProperty = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this property listing?');

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });

      if (res.status === 200) {
        // Remove deleted property from UI
        const updatedProperties = properties.filter((property) => property._id !== id);
        setProperties(updatedProperties);
        toast.success('Property listing deleted successfully.');
      } else {
        toast.warn('Something went wrong. Try again or contact Support.');
        console.warn("Response status wasn't 200", res.status);
      }
    } catch (error) {
      toast.error('Failed to delete property listing.');
      console.error('Failed to delete property listing.', error);
    }
  };

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Profile</h1>

          <div className='flex flex-col md:flex-row'>
            <div className='md:w-1/4 mr-20 mt-10'>
              <div className='mb-4'>
                <Image
                  className='h-32 w-32 md:h-48 md:w-48 rounded-xl mx-auto md:mx-0'
                  src={profileImage}
                  alt='User'
                  width={0}
                  height={0}
                  sizes='100vw'
                />
              </div>

              <h2 className='text-2xl mb-4'>
                <span className='font-bold block'>Name: </span> {profileName}
              </h2>

              <h2 className='text-2xl'>
                <span className='font-bold block'>Email: </span> {profileEmail}
              </h2>
            </div>

            {/* User Listings */}
            <div className='md:w-3/4 md:pl-4'>
              <h2 className='text-xl font-semibold mb-4'>Your Listings</h2>

              {/* No User Listings */}
              {!loading && properties.length === 0 && (
                <>
                  <h3>You have no property listings.</h3>
                  <p className='mb-3'>
                    Go to{' '}
                    <Link href='/properties/add' className='text-blue-600 font-medium underline'>
                      Add Property
                    </Link>{' '}
                    to create a new listing.
                  </p>
                </>
              )}

              {/* User Properties */}
              {loading ? (
                <Spinner loading={loading} />
              ) : (
                properties.map((property) => (
                  <div key={property._id} className='mb-10'>
                    <Link href={`/properties/${property._id}`}>
                      <Image
                        className='h-32 w-full rounded-md object-cover'
                        src={property.images[0]}
                        alt=''
                        width={0}
                        height={0}
                        sizes='100vw'
                      />
                    </Link>

                    <div className='mt-2'>
                      <p className='text-lg font-semibold'>{property.name}</p>
                      <p className='text-gray-600'>
                        Address:{' '}
                        {`${property.location.street}, ${property.location.state} ${property.location.zipcode}`}
                      </p>
                    </div>

                    <div className='mt-2'>
                      <Link
                        href={`/properties/${property._id}/edit`}
                        className='bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600'>
                        Edit
                      </Link>

                      <button
                        className='bg-red-500 text-white px-3 py-3 rounded-md hover:bg-red-600'
                        type='button'
                        onClick={() => handleDeleteProperty(property._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProfilePage;
