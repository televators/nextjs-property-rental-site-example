'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { FaGoogle, FaRegEnvelope } from 'react-icons/fa';
import logo from '@/assets/images/logo-white.png';
import profileDefault from '@/assets/images/profile.png';
import MobileMenu from '@/components/navbar/MobileMenu';
import ProfileDropdown from '@/components/navbar/ProfileDropdown';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import UnreadMessageCount from './navbar/UnreadMessageCount';

const Navbar = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [providers, setProviders] = useState(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const pathname = usePathname();

  const toggleProfileDropdownState = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  const handleClickOutsideProfile = (e) => {
    if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)) {
      setIsProfileDropdownOpen(false);
    }
  };

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    // Just so it's possible to remove the event listener in the cleanup function.
    const closeMenu = () => {
      setIsMenuOpen(false);
    };

    setAuthProviders();

    window.addEventListener('resize', closeMenu);
    document.addEventListener('click', handleClickOutsideProfile);

    // Cleanup previous render's event listener.
    return () => {
      window.removeEventListener('resize', closeMenu);
      document.removeEventListener('click', handleClickOutsideProfile);
    };
  }, []);

  return (
    <nav className='bg-blue-700 border-b border-blue-500'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-20 items-center justify-between'>
          {/* Mobile menu button*/}
          <div className='absolute inset-y-0 left-0 flex items-center md:hidden'>
            <button
              type='button'
              id='mobile-dropdown-button'
              className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
              aria-controls='mobile-menu'
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <span className='absolute -inset-0.5'></span>
              <span className='sr-only'>Open main menu</span>
              <svg
                className='block h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
              </svg>
            </button>
          </div>

          {/* Logo and Desktop Menu */}
          <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
            {/* Logo */}
            <Link className='flex flex-shrink-0 items-center' href='/'>
              {/* NOTE: Setting `priority` to true so it gets preloaded. Next reported that it was the LCP
                and should be marked as priority. Use on any layout-shaping images above the fold. */}
              <Image className='h-10 w-auto' src={logo} alt='PropertyPulse' priority={true} />

              <span className='hidden md:block text-white text-2xl font-bold ml-2'>PropertyPulse</span>
            </Link>

            {/* Desktop Menu Hidden below md screens */}
            <div className='hidden md:ml-6 md:block'>
              <div className='flex space-x-2'>
                <Link
                  href='/'
                  className={`${
                    pathname === '/' ? 'bg-black' : ''
                  } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                >
                  Home
                </Link>
                <Link
                  href='/properties'
                  className={`${
                    pathname === '/properties' ? 'bg-black' : ''
                  } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                >
                  Properties
                </Link>
                {session && (
                  <Link
                    href='/properties/add'
                    className={`${
                      pathname === '/properties/add' ? 'bg-black' : ''
                    } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                  >
                    Add Property
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Right Side Menu (Logged Out) */}
          {!session && (
            <div className='hidden md:block md:ml-6'>
              <div className='flex items-center'>
                {providers &&
                  Object.values(providers).map((provider, index) => (
                    <button
                      key={index}
                      onClick={() => signIn(provider.id)}
                      className='flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
                    >
                      <FaGoogle className='text-white mr-2' />
                      <span>Login or Register</span>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Right Side Menu (Logged In) */}
          {session && (
            <div className='absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0'>
              <Link href='/messages' className='relative group'>
                <button
                  type='button'
                  className='relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                >
                  <span className='absolute -inset-1.5'></span>
                  <span className='sr-only'>View messages</span>

                  <FaRegEnvelope className='h-6 w-6 p-0.5' />
                </button>

                <UnreadMessageCount />
              </Link>

              {/* Profile dropdown button */}
              <div className='relative ml-3'>
                <div>
                  <button
                    type='button'
                    className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                    id='user-menu-button'
                    aria-expanded='false'
                    aria-haspopup='true'
                    onClick={() => setIsProfileDropdownOpen((prev) => !prev)}
                    ref={profileDropdownRef}
                  >
                    <span className='absolute -inset-1.5'></span>
                    <span className='sr-only'>Open user menu</span>
                    <Image
                      className='h-8 w-8 rounded-full'
                      src={profileImage || profileDefault}
                      alt=''
                      width={40}
                      height={40}
                    />
                  </button>
                </div>

                {/* Profile dropdown */}
                {isProfileDropdownOpen && (
                  <ProfileDropdown signOut={signOut} toggleProfileDropdownState={toggleProfileDropdownState} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      {isMenuOpen && <MobileMenu providers={providers} session={session} />}
    </nav>
  );
};

export default Navbar;
