import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage/Home";
import Contact from "./pages/Contact";
import Team from "./pages/TeamPage/Team";
import RegisterComponent from "./User/RegisterComponent";
import LoginComponent from "./User/LoginComponent";
import AuthContext from "./contexts/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import Products from "./pages/ProductsPage/Products";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const validateToken = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setUser(null);
          return;
        }
        const { data } = await axios("http://localhost:3000/auth/validate", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(data);
      } catch (error) {
        console.error("Token validation failed:", error);
        // Clear invalid token
        localStorage.removeItem("token");
        setUser(null);
      }
    };
    validateToken();
  }, []);
  return (
    <div>
      <AuthContext.Provider value={{ user, setUser }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/team" element={<Team />} />
          <Route path="/signup" element={<RegisterComponent />} />
          <Route path="/login" element={<LoginComponent />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
