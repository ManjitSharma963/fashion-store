import React from "react";
import ProductCard from "./ProductCard";
import "../styles/productGrid.css";

const ProductGrid = ({ products, onProductClick }) => {
  return (
    <section className="featured-products" id="featured-products">
      <div className="container">
        <div className="section-header">
          <h2>Featured Products</h2>
          <p className="section-subtitle">
            Handpicked products that combine style, quality, and affordability
          </p>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onProductClick={onProductClick}
            />
          ))}
        </div>
        <div className="load-more-section">
          <button className="load-more-btn">
            Load More Products
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;