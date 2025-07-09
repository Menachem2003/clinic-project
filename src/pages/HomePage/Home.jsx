import Middlehome from "./component/MiddleHome";
import HeroSection from "./component/HeroSection";
import CategoriesSection from "./component/CategoriesSection";
import "./Home.css";

function Home() {
  return (
    <div className="container">
      <HeroSection />
      <CategoriesSection />
      <Middlehome />
    </div>
  );
}

export default Home;
