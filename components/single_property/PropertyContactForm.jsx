'use client';
import { useState } from 'react';
import { useFormStatus, useFormState } from 'react-dom';
import { useSession } from 'next-auth/react';
import { FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';
import sendMessage from '@/app/actions/sendMessage';

function MessageSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:bg-blue-700 focus:shadow-outline flex items-center justify-center'
      type='submit'
      disabled={pending}
    >
      <FaPaperPlane className='mr-2' /> {pending ? 'Sending...' : 'Send Message'}
    </button>
  );
}

// NOTE: useFormState is broken in Next.js v14.2.4 (current latest). At time of writing, using v14.1.0 as useFormState works reliably. In v14.2.4, the formState isn't set correctly and either gets continuously reset to initial state value or when it gets set, resets itself and triggers re-renders. Can't use the formState for anything since it's completely unreliable.
const PropertyContactForm = ({ property }) => {
  const { data: session } = useSession();
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const handleSubmit = async (prevState, formData) => {
    const result = await sendMessage(prevState, formData);

    if (result.error) {
      toast.error(result.error);
    } else if (result.submitted) {
      setWasSubmitted(true);
      toast.success('Message sent.');
    }
  };

  const [formState, formAction] = useFormState(handleSubmit, {
    submitted: false,
    error: false,
  });

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h3 className='text-xl font-bold mb-6'>Contact Property Manager</h3>
      {!session ? (
        <p>Please sign in to send messages.</p>
      ) : wasSubmitted ? (
        <p className='text-green-500 mb-4'>Message sent successfully.</p>
      ) : (
        <form action={formAction}>
          {/* NOTE: Hidden inputs for Property ID and Owner */}
          <input type='hidden' name='property' defaultValue={property._id} />
          <input type='hidden' name='recipient' defaultValue={property.owner} />

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
              Name:
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='name'
              type='text'
              name='name'
              placeholder='Your name'
              required
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
              Email:
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='email'
              type='email'
              name='email'
              placeholder='Your email'
              required
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='phone'>
              Phone:
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='phone'
              type='text'
              name='phone'
              placeholder='Your phone number'
              autoComplete='tel-national'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='message'>
              Message:
            </label>
            <textarea
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline'
              id='message'
              name='message'
              placeholder='Your message'
            ></textarea>
          </div>

          <div>
            <MessageSubmitButton />
          </div>
        </form>
      )}
    </div>
  );
};
export default PropertyContactForm;
