import React from "react";
import "../styles/heroBanner.css";

const HeroBanner = () => {
  return (
    <div className="hero-banner">
      <div className="container">
        <div className="hero-content">
          <h1>
            Discover Your <span className="highlight">Perfect Style</span> Today
          </h1>
          <p>Explore our premium collection of fashion-forward pieces designed for the modern lifestyle. From timeless classics to trending styles, find everything you need to express your unique personality.</p>
          <div className="hero-actions">
            <a href="#featured-products" className="shop-now-btn">
              Shop Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#categories" className="learn-more-btn">
              Explore Categories
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">25K+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">1000+</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">Brands</span>
            </div>
          </div>
          <div className="trust-indicators">
            <span className="trust-text">Trusted by fashion enthusiasts worldwide</span>
          </div>
        </div>
        <div className="hero-image">
          <img src="/image/hero.jpeg" alt="Fashion Banner" />
        </div>
      </div>
      <div className="scroll-indicator">
        <span>Scroll to explore</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 13l3 3 7-7"/>
          <path d="M12 17V7"/>
        </svg>
      </div>
    </div>
  );
};

export default HeroBanner;