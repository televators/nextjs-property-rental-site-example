import Link from 'next/link';

const Pagination = ({ page, pageSize, resultsCount }) => {
  const pagesCount = Math.ceil(resultsCount / pageSize);

  return (
    <section className='container mx-auto flex justify-center items-center my-8'>
      {page === 1 ? (
        <button disabled={true} className='mr-2 px-4 py-1 text-md text-gray-500 bg-gray-300 rounded-lg'>
          Previous
        </button>
      ) : (
        <Link
          className='mr-2 px-4 py-1 bg-blue-500 text-md text-white disabled:text-gray-500 disabled:bg-gray-300 rounded-lg'
          href={`/properties?page=${page - 1}`}
        >
          Previous
        </Link>
      )}

      <span className='mx-2'>
        Page {page} of {pagesCount}
      </span>

      {page === pagesCount ? (
        <button disabled={true} className='ml-2 px-4 py-1 text-md text-gray-500 bg-gray-300 rounded-lg'>
          Next
        </button>
      ) : (
        <Link
          className='ml-2 px-4 py-1 bg-blue-500 text-md text-white disabled:text-gray-500 disabled:bg-gray-300 rounded-lg'
          href={`/properties?page=${page + 1}`}
        >
          Next
        </Link>
      )}
    </section>
  );
};
export default Pagination;
