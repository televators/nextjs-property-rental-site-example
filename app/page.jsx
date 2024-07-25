import Hero from '@/components/home/Hero';
import InfoBoxes from '@/components/home/InfoBoxes';
import HomeProperties from '@/components/home/HomeProperties';
import FeaturedProperties from '@/components/home/FeaturedProperties';

const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties featuredCount={2} />
      <HomeProperties />
    </>
  );
};

export default HomePage;
