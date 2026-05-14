import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";
function Home() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <HeroSection />
      <FeatureSection />
    </div>
  );
}

export default Home;