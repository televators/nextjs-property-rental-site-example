import connectDB from '@/config/database';
import User from '@/models/User';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider( {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        }
      },
      // TODO: Use 40s on DEV, default (3.5s) on PROD based on .env
      httpOptions: {
        timeout: 40000,
      },
    } ),
  ],
  callbacks: {
    // Invoked on successful sign-in
    async signIn( { profile } ) {
      // 1. Connect to DB
      await connectDB();

      // 2. Check if user exists
      const userExists = await User.findOne( { email: profile.email } );

      // 3. If not, add user to DB
      if ( ! userExists ) {
        // 3a. Truncate user name if too long
        const username = profile.name.slice( 0, 20 );

        await User.create( {
          email: profile.email,
          username,
          image: profile.picture,
        } )
          .then( result => console.log( result ) );
      }

      // 4. Return true to allow sign-in
      return true;
    },
    // Modifies the session object
    async session( { session } ) {
      // 1. Get user from DB
      const current_user = await User.findOne( { email: session.user.email } );

      // 2. Assign user ID to session
      session.user.id = current_user._id.toString();

      // 3. Return session
      return session;
    },
  }
};
