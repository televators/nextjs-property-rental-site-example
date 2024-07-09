import AuthProvider from '@/components/AuthProvider';
import { GlobalProvider } from '@/context/GlobalContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ToastContainer } from 'react-toastify';
import '@/assets/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import 'photoswipe/dist/photoswipe.css';

// TODO: New route group for photoswipe and toastify maybe

// TODO: Setup metadata for all pages instead of just pulling this global one
export const metadata = {
  title: 'Property Pulse | Find the perfect rental',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur soluta blanditiis itaque repudiandae dicta fuga deleniti?',
  keywords: 'rental, find rentals, rental property, for rent, rent daily, rent weekly',
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <GlobalProvider>
        <html lang='en'>
          <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </GlobalProvider>
    </AuthProvider>
  );
};

export default MainLayout;
