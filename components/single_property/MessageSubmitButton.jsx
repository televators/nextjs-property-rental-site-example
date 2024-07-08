'use client';
import { useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { FaPaperPlane } from 'react-icons/fa';

const originalLog = console.log;
// Overwriting
console.log = function () {
  var args = [].slice.call(arguments);
  originalLog.apply(console.log, [getCurrentDateString()].concat(args));
};
// Returns current timestamp
function getCurrentDateString() {
  return new Date().toISOString() + ' ::';
}

const MessageSubmitButton = () => {
  const status = useFormStatus();

  useEffect(() => {
    console.log('status changed in submit button');
  }, [status]);

  return (
    <button
      className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:bg-blue-700 focus:shadow-outline flex items-center justify-center'
      type='submit'
    >
      <FaPaperPlane className='mr-2' /> {status.pending ? 'Sending...' : 'Send Message'}
    </button>
  );
};

export default MessageSubmitButton;
