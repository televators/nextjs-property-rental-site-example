'use client';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import HomeProperties from '@/components/HomeProperties';

const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes></InfoBoxes>
      <HomeProperties />
      <Footer />
    </>
  );
};

export default HomePage;
