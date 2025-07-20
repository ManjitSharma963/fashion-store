import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaShoppingCart } from "react-icons/fa";
import "../styles/header.css";

const Header = () => {
  return (
    <header>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="notification">
          Free Shipping Worldwide for all orders over $199{" "}
          <a href="#shop-now">Shop Now</a>
        </div>
        <div className="top-links">
          <a href="#about-us">About Us</a>
          <a href="#blog">Blog</a>
          <a href="#contact-us">Contact Us</a>
          <a href="#faq">FAQs</a>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="navbar">
        <div className="logo">
          <h1>Fashion Store</h1>
        </div>
        <nav className="nav-links">
          <ul>
            <li>
              <a href="#categories">Shop by Categories</a>
            </li>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#shop">Shop</a>
            </li>
            <li>
              <a href="#products">Products</a>
            </li>
            <li>
              <a href="#deals">Top Deals</a>
            </li>
            <li>
              <a href="#offers">Best Offers</a>
            </li>
          </ul>
        </nav>
        <div className="nav-icons">
          <a href="#cart">
            <FaShoppingCart /> My Cart
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;