import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set( 'strictQuery', true );

  // If the DB is already connected, don't connect again.
  if ( connected ) {
    console.log('MongoDB is already connected...');

    return;
  }

  // Connect to MongoDB
  await mongoose.connect( process.env.MONGODB_URI );
  connected = true;
  console.log( 'mongodb connected!' );
};

export default connectDB;
