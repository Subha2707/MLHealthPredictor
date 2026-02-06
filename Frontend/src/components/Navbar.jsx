import { NavLink } from "react-router-dom";
import { useState } from "react";

import healthaifavicon from "../assets/healthaifavicon.png";
import {
  FaHospital,
  FaBars,
  FaTimes,
  FaHome,
  FaChartBar,
  FaHeartbeat,
  FaQuestionCircle,
  FaPhone,
  FaInfoCircle
} from "react-icons/fa";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="nav-logo">
        <img src={healthaifavicon} alt="HealthPredict Logo" className="nav-logo-img"/>
        <span>HealthPredict</span>
      </div>

      {/* Hamburger */}
      <div className="hamburger" onClick={() => setOpen(!open)}>
        {open ? <FaTimes /> : <FaBars />}
      </div>

      {/* Links */}
      <ul className={`nav-links ${open ? "open" : ""}`}>
        <li><NavLink to="/" end onClick={closeMenu}><FaHome /> Home</NavLink></li>
        <li><NavLink to="/results" onClick={closeMenu}><FaChartBar /> Results</NavLink></li>
        <li><NavLink to="/bmi" onClick={closeMenu}><FaHeartbeat /> BMI Analysis</NavLink></li>
        <li><NavLink to="/query" onClick={closeMenu}><FaQuestionCircle /> Ask Query</NavLink></li>
        <li><NavLink to="/contact" onClick={closeMenu}><FaPhone /> Contact</NavLink></li>
        <li><NavLink to="/about" onClick={closeMenu}><FaInfoCircle /> About</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
