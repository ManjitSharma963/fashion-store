import React, { useState } from "react";
import { FaShoppingCart, FaSearch, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";
import "../styles/header.css";

const Header = ({ onCartClick, cartCount = 0, cartTotal = 0, user, onLoginClick, onSignupClick }) => {
  const displayTotal = isNaN(cartTotal) ? '0.00' : cartTotal.toFixed(2);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <header className="modern-header">
      <div className="navbar">
        <div className="logo">
          <h1>Quicky</h1>
        </div>
        <nav className="nav-links">
          <ul>
            <li>
              <Link to="/">Home</Link>
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
          <button className="cart-icon-btn" onClick={onCartClick} style={{ background: "none", border: "none", cursor: "pointer", position: "relative" }}>
            <FaShoppingCart />
            {cartCount > 0 && (
              <span style={{ marginLeft: 6, fontWeight: 600, color: "#ef4444", fontSize: 14 }}>
                ${displayTotal} ({cartCount})
              </span>
            )}
          </button>
          {/* Removed Login and Signup buttons from here */}
          <button
            className="profile-btn"
            style={{ background: "none", border: "none", cursor: "pointer", marginLeft: 8 }}
            onClick={() => setSidebarOpen(true)}
            aria-label="User menu"
          >
            <FaUser />
          </button>
          <ProfileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} user={user} onAuthClick={onLoginClick} />
        </div>
      </div>
    </header>
  );
};

export default Header;