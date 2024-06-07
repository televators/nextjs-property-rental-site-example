import { v2 as cloudinary } from 'cloudinary';

cloudinary.config( {
  // Account
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  // Settings
  analytics: false,
} );

export default cloudinary;
