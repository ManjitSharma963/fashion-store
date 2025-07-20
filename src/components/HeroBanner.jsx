import React from "react";
import "../styles/heroBanner.css";

const HeroBanner = () => {
  return (
    <div className="hero-banner">
      <div className="hero-content">
        <h1>Limited Edition For Queen Styles Fashion</h1>
        <p>Awesome products for the dynamic urban lifestyle</p>
        <button className="shop-now-btn">Shop Now</button>
      </div>
      <div className="hero-image">
        <img src="/image/hero.jpeg" alt="Fashion Banner" />
      </div>
    </div>
  );
};

export default HeroBanner;