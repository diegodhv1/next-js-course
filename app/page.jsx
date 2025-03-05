import FeaturedProperties from "@/components/FeatureProperties";
import Hero from "@/components/hero";
import HomeProperties from "@/components/HomeProperties";
import { InfoBoxes } from "@/components/infoBoxes";

const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperties />
    </>
  );
};

export default HomePage;
