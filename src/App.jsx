import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Team from "./pages/Team";

function App() {
  return (
    <div>
      <Navbar />
      <div style={{ marginTop: "150px", padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
