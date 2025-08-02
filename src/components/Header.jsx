import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaSearch, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";
import "../styles/header.css";

const Header = ({ onCartClick, cartCount = 0, cartTotal = 0, user, onLoginClick, onSignupClick }) => {
  const displayTotal = isNaN(cartTotal) ? '0.00' : cartTotal.toFixed(2);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="announcement-bar">
        <div className="container">
          🎉 Free shipping on orders over $50! <a href="#sale">Shop Sale Items</a>
        </div>
      </div>
      <header className={`modern-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar">
        <div className="logo">
          <h1>Quicky</h1>
        </div>
        
        <button 
          className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
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
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="search-input"
            />
          </div>
          
          <button className="nav-icon-btn" aria-label="Search">
            <FaSearch />
          </button>
          
          <button className="cart-icon-btn" onClick={onCartClick} style={{ background: "none", border: "none", cursor: "pointer", position: "relative" }}>
            <FaShoppingCart />
            {cartCount > 0 && (
              <span className="cart-info">
                <span className="cart-count">{cartCount}</span>
                <span className="cart-total">${displayTotal}</span>
              </span>
            )}
          </button>
          
          <button
            className="profile-btn"
            style={{ background: "none", border: "none", cursor: "pointer", marginLeft: 8 }}
            onClick={() => setSidebarOpen(true)}
            aria-label="User menu"
          >
            <FaUser />
          </button>
        </div>
        
        <div className={`mobile-nav ${mobileMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
            <li><a href="#shop" onClick={() => setMobileMenuOpen(false)}>Shop</a></li>
            <li><a href="#pages" onClick={() => setMobileMenuOpen(false)}>Pages</a></li>
            <li><a href="#blog" onClick={() => setMobileMenuOpen(false)}>Blog</a></li>
            <li><a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
          </ul>
        </div>
      </div>
      </header>
      
      <ProfileSidebar 
        open={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        user={user} 
        onAuthClick={onLoginClick} 
      />
    </>
  );
};

export default Header;