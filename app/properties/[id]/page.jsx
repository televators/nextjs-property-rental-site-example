import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { convertToSerializableObject } from '@/utils/convertToObject';
import Link from 'next/link';
import PropertyHeaderImage from '@/components/single_property/PropertyHeaderImage';
import BackToAll from '@/components/single_property/BackToAll';
import PropertyDetails from '@/components/single_property/PropertyDetails';
import PropertyAllImages from '@/components/single_property/PropertyAllImages';
import PropertySidebar from '@/components/single_property/PropertySidebar';

const PropertyPage = async ({ params }) => {
  const PUBLIC_DOMAIN = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
  const propertyID = params.id;
  let userOwnsCurrentProperty = false;

  await connectDB();

  if (!propertyID || propertyID.length === 0) {
    console.error('Property ID malformed. ID: ', '\n', propertyID);

    return (
      <h1 className='text-center text-2xl font-bold mt-10'>
        Property ID doesn't exist. The property may have been deleted or the ID may have changed. Please go back to{' '}
        <Link href='/properties'>All Properties</Link> and try again.
      </h1>
    );
  }

  // Grab property from DB
  // NOTE: Using lean() makes Mongoose return plain JS object instead of first instantiating a full
  // Document from it. Faster but the object doesn't have any of the Mongoose Doc obj methods, obvs.
  // If finding a doc to perform CRUD actions on it, omit lean() and fetch the full Doc.
  const propertyEntry = await Property.findById(propertyID).lean();

  if (!propertyEntry) {
    return <h1 className='text-center text-2xl font-bold mt-10'>Property not found.</h1>;
  }

  const simplifiedPropertyEntry = convertToSerializableObject(propertyEntry);

  // After we know the property exists and we successfully retrieve it, grab the session user's
  // ID if they're logged in and pass it to the sidebar component. Even though there's a conditional
  // in the message submission route to prevent users from messaging themselves, this behavior shouldn't
  // be possible on the front-end in the first place. Keeping the server side check but also showing
  // a message instead of the form to a user looking at their own property
  const sessionUser = await getSessionUser();

  if (sessionUser && sessionUser.userID) {
    if (propertyEntry.owner === sessionUser.userID) {
      userOwnsCurrentProperty = true;
    }
  }

  return (
    <>
      <PropertyHeaderImage image={propertyEntry.images[0]} />
      <BackToAll />

      <section className='bg-blue-50'>
        <div className='container m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
            {/*
              NOTE: Even though the lean Mongoose query returns a plain JS object, it still has
              some methods attached and Next doesn't like that. When passing the whole Document
              as a prop, even the lean version must be further stripped.
            */}
            <PropertyDetails property={simplifiedPropertyEntry} />
            <PropertySidebar
              property={simplifiedPropertyEntry}
              PUBLIC_DOMAIN={PUBLIC_DOMAIN}
              userOwnsCurrentProperty={userOwnsCurrentProperty}
            />
          </div>
        </div>
      </section>

      <PropertyAllImages images={propertyEntry.images} />
    </>
  );
};

export default PropertyPage;
