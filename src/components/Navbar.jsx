import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";

const links = [
  { path: "/", title: "בית" },
  { path: "/products", title: "המוצרים שלנו" },
  { path: "/team", title: "הצוות" },
  { path: "/contact", title: "צור קשר" },
];

function Navbar() {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="navbar">
      <img src="/clinic/headerLogo.jpg" alt="לוגו המרפאה" className="logo" />
      

      <div className="hamburger-menu" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              {link.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
