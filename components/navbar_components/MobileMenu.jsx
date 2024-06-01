import React, { useState } from 'react';
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

const MobileMenu = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div id='mobile-menu'>
      <div className='space-y-1 px-2 pb-3 pt-2'>
        <Link
          href='/'
          className={`${
            pathname === '/' ? 'bg-black' : ''
          } text-gray-300 block rounded-md px-3 py-2 text-base font-medium`}
        >
          Home
        </Link>
        <Link
          href='/properties'
          className={`${
            pathname === '/properties' ? 'bg-black' : ''
          } text-gray-300 block rounded-md px-3 py-2 text-base font-medium`}
        >
          Properties
        </Link>
        {isLoggedIn && (
          <Link
            href='/properties/add'
            className={`${
              pathname === '/properties/add' ? 'bg-black' : ''
            } text-gray-300 block rounded-md px-3 py-2 text-base font-medium`}
          >
            Add Property
          </Link>
        )}
        <button className='flex items-center text-white bg-gray-700 rounded-md px-3 py-2 my-4'>
          <FaGoogle className='text-white mr-2' />
          <span>Login or Register</span>
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
