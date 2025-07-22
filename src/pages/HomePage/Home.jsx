import Middlehome from "./component/MiddleHome";
import HeroSection from "./component/HeroSection";
import ServicesSection from "./component/ServicesSection";
import "./Home.css";

function Home() {
  return (
    <div className="container">
      <HeroSection />
      <ServicesSection />
      <Middlehome />
    </div>
  );
}

export default Home;
