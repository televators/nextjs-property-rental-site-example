const Pagination = ({ page, pageSize, resultsCount, onPageChange }) => {
  const pagesCount = Math.ceil(resultsCount / pageSize);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagesCount) {
      onPageChange(newPage);
    }
  };

  return (
    <section className='container mx-auto flex justify-center items-center my-8'>
      <button
        className='mr-2 px-4 py-1 bg-blue-500 text-md text-white disabled:text-gray-500 disabled:bg-gray-300 rounded-lg'
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        Previous
      </button>

      <span className='mx-2'>
        Page {page} of {pagesCount}
      </span>

      <button
        className='ml-2 px-4 py-1 bg-blue-500 text-md text-white disabled:text-gray-500 disabled:bg-gray-300 rounded-lg'
        disabled={page === pagesCount}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </button>
    </section>
  );
};
export default Pagination;
