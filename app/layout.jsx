import Navbar from '@/components/Navbar';
import '@/assets/styles/globals.css';
import AuthProvider from '@/components/AuthProvider';

export const metadata = {
  title: 'Property Pulse | Find the perfect rental',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur soluta blanditiis itaque repudiandae dicta fuga deleniti?',
  keywords: 'rental, find rentals, rental property, for rent, rent daily, rent weekly',
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang='en'>
        <body>
          <Navbar />
          <main>{children}</main>
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
