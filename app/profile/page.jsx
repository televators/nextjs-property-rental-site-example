'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import profileDefault from '@/assets/images/profile.png';

const ProfilePage = () => {
  const { data: session } = useSession();

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Profile</h1>

          <div className='flex flex-col md:flex-row'>
            <div className='md:w-1/4 mx-20 mt-10'>
              <div className='mb-4'>
                <Image
                  className='h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0'
                  src={session?.user?.image || profileDefault}
                  alt='User'
                  width={0}
                  height={0}
                  sizes='100vw'
                />
              </div>

              <h2 className='text-2xl mb-4'>
                <span className='font-bold block'>Name: </span> {session?.user?.name}
              </h2>

              <h2 className='text-2xl'>
                <span className='font-bold block'>Email: </span> {session?.user?.email}
              </h2>
            </div>

            {/* User Listings */}
            <div className='md:w-3/4 md:pl-4'>
              <h2 className='text-xl font-semibold mb-4'>Your Listings</h2>

              <div className='mb-10'>
                <a href='/properties/1'>
                  <Image
                    className='h-32 w-full rounded-md object-cover'
                    src='/images/properties/b1.jpg'
                    alt='Property 2'
                    width={0}
                    height={0}
                    sizes='100vw'
                  />
                </a>

                <div className='mt-2'>
                  <p className='text-lg font-semibold'>Property Title 1</p>
                  <p className='text-gray-600'>Address: 123 Main St</p>
                </div>

                <div className='mt-2'>
                  <Link
                    href='/properties/add'
                    className='bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600'>
                    Edit
                  </Link>

                  <button className='bg-red-500 text-white px-3 py-3 rounded-md hover:bg-red-600' type='button'>
                    Delete
                  </button>
                </div>
              </div>

              <div className='mb-10'>
                <a href='/properties/2'>
                  <Image
                    className='h-32 w-full rounded-md object-cover'
                    src='/images/properties/b1.jpg'
                    alt='Property 2'
                    width={0}
                    height={0}
                    sizes='100vw'
                  />
                </a>
                <div className='mt-2'>
                  <p className='text-lg font-semibold'>Property Title 2</p>
                  <p className='text-gray-600'>Address: 456 Elm St</p>
                </div>
                <div className='mt-2'>
                  <a
                    href='/properties/add'
                    className='bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600'>
                    Edit
                  </a>
                  <button className='bg-red-500 text-white px-3 py-3 rounded-md hover:bg-red-600' type='button'>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProfilePage;
