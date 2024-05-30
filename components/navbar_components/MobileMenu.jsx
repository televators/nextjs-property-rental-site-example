import React from 'react';
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';

const MobileMenu = () => {
  return (
    <div id='mobile-menu'>
      <div className='space-y-1 px-2 pb-3 pt-2'>
        <Link href='/' className='bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium'>
          Home
        </Link>
        <Link href='/properties' className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'>
          Properties
        </Link>
        <Link href='/properties/add' className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'>
          Add Property
        </Link>
        <button className='flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-4'>
          <FaGoogle className='text-white mr-2' />
          <span>Login or Register</span>
        </button>
      </div>
    </div>
  );
}

export default MobileMenu;
