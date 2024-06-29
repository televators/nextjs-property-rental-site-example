'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';

const PropertyContactForm = ({ property }) => {
  const { data: session } = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [phone, setPhone] = useState('');
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const clearFields = () => {
    setName('');
    setEmail('');
    setMessage('');
    setPhone('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      phone,
      message,
      recipient: property.owner,
      property: property._id,
    };

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      // API route returns standardized message property in response object for all
      // pertinent statuses; consume them here instead of hardcoding messages redundantly.
      const resMessage = await res.json().then((data) => data.message);

      if (res.status === 200) {
        setWasSubmitted(true);
        clearFields();
        toast.success(resMessage);
      } else if (res.status === 400) {
        toast.error(resMessage);
        console.error(resMessage);
      } else {
        toast.error('Error sending message. Please try again.');
        console.error(resMessage);
      }
    } catch (error) {
      toast.error('Server encountered an error while sending message.');
      console.error(error);
    }
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h3 className='text-xl font-bold mb-6'>Contact Property Manager</h3>
      {!session ? (
        <p>Please sign in to send messages.</p>
      ) : wasSubmitted ? (
        <p className='text-green-500 mb-4'>Message sent successfully.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
              Name:
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='name'
              type='text'
              placeholder='Your name'
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              placeholder='Your email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder='Your phone number'
              autoComplete='tel-national'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='message'>
              Message:
            </label>
            <textarea
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline'
              id='message'
              placeholder='Your message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}></textarea>
          </div>

          <div>
            <button
              className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:bg-blue-700 focus:shadow-outline flex items-center justify-center'
              type='submit'>
              <FaPaperPlane className='mr-2' /> Send Message
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
export default PropertyContactForm;
