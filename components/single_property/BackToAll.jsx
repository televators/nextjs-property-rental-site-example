import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

const BackToAll = ({ withWrapper = true }) => {
  return withWrapper ? (
    <section>
      <div className='container m-auto py-6 px-6'>
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
