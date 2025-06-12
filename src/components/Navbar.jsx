import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <img src="/clinic/headerLogo.jpg" alt="logo" className="logo" />
      <ul className="nav-links">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            בית
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/services"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            שירותים
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/team"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            הצוות
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            צור קשר
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
