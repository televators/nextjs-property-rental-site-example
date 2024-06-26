import { GlobalProvider } from '@/context/GlobalContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@/assets/styles/globals.css';
import AuthProvider from '@/components/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'photoswipe/dist/photoswipe.css';

export const metadata = {
  title: 'Property Pulse | Find the perfect rental',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur soluta blanditiis itaque repudiandae dicta fuga deleniti?',
  keywords: 'rental, find rentals, rental property, for rent, rent daily, rent weekly',
};

const MainLayout = ({ children }) => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang='en'>
          <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  );
};

export default MainLayout;
