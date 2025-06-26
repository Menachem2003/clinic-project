import { NavLink } from "react-router-dom"; 
import "./Navbar.css"; 

const links = [
  { path: '/', title: 'בית' },
  { path: '/services', title: 'שירותים' },
  { path: '/team', title: 'הצוות' },
  { path: '/contact', title: 'צור קשר' }
];

function Navbar() {
  return (
    <nav className="navbar">
      <img src="/clinic/headerLogo.jpg" alt="לוגו המרפאה" className="logo" />
      
      <ul className="nav-links">
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