import Image from 'next/image';
import Link from 'next/link';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { convertToSerializableObject } from '@/utils/convertToObject';
import { getSessionUser } from '@/utils/getSessionUser';
import profileDefault from '@/assets/images/profile.png';
import ProfileProperties from '@/components/profile/ProfileProperties';

const ProfilePage = async () => {
  await connectDB();

  //#region User Authentication, Authorization, & Details
  const sessionUser = await getSessionUser();

  const { name, email, image, id: userID } = sessionUser.user;

  if (!userID) {
    throw new Error('User ID is required.');
  }
  const profileName = name || "[Couldn't retrieve user's name]";
  const profileEmail = email || "[Couldn't retrieve user's email]";
  const profileImage = image || profileDefault;
  //#endregion

  // Get all properties belonging to current user.
  const propertyDocs = await Property.find({ owner: userID }).lean();
  // Convert to serializable object to pass to client component MessageCard
  const properties = [...propertyDocs].map(convertToSerializableObject);

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
              {properties.length === 0 ? (
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
              ) : (
                <ProfileProperties properties={properties} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProfilePage;
