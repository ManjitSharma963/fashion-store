import React from "react";
import { FaShoppingCart, FaSearch, FaUser } from "react-icons/fa";
import "../styles/header.css";

const Header = () => {
  return (
    <header className="modern-header">
      <div className="navbar">
        <div className="logo">
          <h1>Quicky</h1>
        </div>
        <nav className="nav-links">
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#shop">Shop</a>
            </li>
            <li>
              <a href="#pages">Pages</a>
            </li>
            <li>
              <a href="#blog">Blog</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
        <div className="nav-icons">
          <a href="#search">
            <FaSearch />
          </a>
          <a href="#cart">
            <FaShoppingCart /> $420 (10)
          </a>
          <a href="#profile">
            <FaUser />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;