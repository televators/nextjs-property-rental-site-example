import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

const BackToAll = ({ withWrapper = true }) => {
  return withWrapper ? (
    <section className='px-4 sm:px-6 lg:px-8 py-6'>
      <div className='container-xl lg:container m-auto'>
        <Link href='/properties' className='text-blue-500 hover:text-blue-600 flex items-center'>
          <FaArrowLeft className='mt-1 mr-2' /> Back to All Properties
        </Link>
      </div>
    </section>
  ) : (
    <Link href='/properties' className='text-blue-500 hover:text-blue-600 mb-6 flex items-center'>
      <FaArrowLeft className='mt-1 mr-2' /> Back to All Properties
    </Link>
  );
};
export default BackToAll;
