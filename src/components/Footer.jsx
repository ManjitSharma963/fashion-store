import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>About Us</h3>
          <p>
            Fashion Store is your one-stop destination for trendy and stylish
            apparel, accessories, and more. We aim to provide the best shopping
            experience for our customers.
          </p>
        </div>
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#categories">Categories</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Contact</h3>
          <p>Email: support@fashionstore.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Address: 123 Fashion Street, NY</p>
        </div>
        <div className="footer-column">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#facebook"><FaFacebookF /></a>
            <a href="#twitter"><FaTwitter /></a>
            <a href="#instagram"><FaInstagram /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Fashion Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;