import React from "react";
import "../styles/navbar.css";

const Navbar = () => (
  <nav className="navbar">
    <div className="logo">MyBrand</div>
    <div className="nav-right">
      <input type="text" placeholder="Search" className="search-bar" />
      <div className="icons">
        <span>👤</span>
        <span>❤️</span>
        <span>🛒</span>
      </div>
    </div>
  </nav>
);

export default Navbar;