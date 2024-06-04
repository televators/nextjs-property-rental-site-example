import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { signIn } from 'next-auth/react';

const MobileMenu = ( { providers, session } ) => {
  const pathname = usePathname();

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
        {session && (
          <Link
            href='/properties/add'
            className={`${
              pathname === '/properties/add' ? 'bg-black' : ''
            } text-gray-300 block rounded-md px-3 py-2 text-base font-medium`}
          >
            Add Property
          </Link>
        )}

        { !session && (
          <>
            { providers && Object.values( providers ).map( ( provider, index ) => (
              <button key={ index } onClick={ () => signIn( provider.id ) } className='flex items-center text-white bg-gray-700 rounded-md px-3 py-2 my-4'>
                <FaGoogle className='text-white mr-2' />
                <span>Login or Register</span>
              </button>
            ) ) }
          </>
        ) }
      </div>
    </div>
  );
};

export default MobileMenu;
