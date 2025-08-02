import React from "react";
import "../styles/heroBanner.css";

const HeroBanner = () => {
  return (
    <div className="hero-banner">
      <div className="container">
        <div className="hero-content">
          <h1>
            Limited Edition For <span className="highlight">Queen Styles</span> Fashion
          </h1>
          <p>Discover awesome products crafted for the dynamic urban lifestyle. Express your unique style with our curated collection.</p>
          <div className="hero-actions">
            <button className="shop-now-btn">
              Shop Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <a href="#categories" className="learn-more-btn">
              Explore Categories
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 12h8M12 8v8"/>
              </svg>
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Brands</span>
            </div>
          </div>
          <div className="trust-indicators">
            <span className="trust-text">Trusted by leading brands</span>
          </div>
        </div>
        <div className="hero-image">
          <img src="/image/hero.jpeg" alt="Fashion Banner" />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;