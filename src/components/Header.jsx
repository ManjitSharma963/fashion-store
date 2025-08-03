import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaSearch, FaUser, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";
import "../styles/header.css";

const Header = ({ onCartClick, cartCount = 0, cartTotal = 0, user, onLoginClick, onSignupClick, wishlistCount = 0 }) => {
  const displayTotal = isNaN(cartTotal) ? '0.00' : cartTotal.toFixed(2);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Implement search functionality
    }
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="announcement-bar">
        <div className="container">
          ✨ New Collection Launch - Up to 40% Off! <a href="#sale">Shop Now</a>
        </div>
      </div>
      <header className={`modern-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar">
          <div className="logo">
            <h1>StyleHub</h1>
          </div>
          
          <button 
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
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
                <a href="#categories">Categories</a>
              </li>
              <li>
                <a href="#featured-products">Products</a>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
          
          <div className="nav-icons">
            <form className="search-container" onSubmit={handleSearch}>
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            
            <button className="nav-icon-btn" aria-label="Wishlist">
              <FaHeart />
              {wishlistCount > 0 && (
                <span className="cart-count" style={{ position: 'absolute', top: '-4px', right: '-4px' }}>
                  {wishlistCount}
                </span>
              )}
            </button>
            
            <button className="cart-icon-btn" onClick={onCartClick}>
              <FaShoppingCart />
              {cartCount > 0 && (
                <div className="cart-info">
                  <span className="cart-count">{cartCount}</span>
                  <span className="cart-total">${displayTotal}</span>
                </div>
              )}
            </button>
            
            <button
              className={`profile-btn nav-icon-btn ${user ? 'online' : ''}`}
              onClick={() => setSidebarOpen(true)}
              aria-label="User menu"
            >
              <FaUser />
            </button>
          </div>
          
          <div className={`mobile-nav ${mobileMenuOpen ? 'active' : ''}`}>
            <ul>
              <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
              <li><a href="#categories" onClick={() => setMobileMenuOpen(false)}>Categories</a></li>
              <li><a href="#featured-products" onClick={() => setMobileMenuOpen(false)}>Products</a></li>
              <li><Link to="/blog" onClick={() => setMobileMenuOpen(false)}>Blog</Link></li>
              <li><Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link></li>
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