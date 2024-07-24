import Hero from '@/components/home/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import HomeProperties from '@/components/home/HomeProperties';
import FeaturedProperties from '@/components/FeaturedProperties';

const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties featuredCount={4} />
      <HomeProperties />
    </>
  );
};

export default HomePage;
