import React from "react";
import "../styles/productCard.css";

const ProductCard = ({ product, onProductClick }) => {
  const placeholderImage = "/images/placeholder.jpg"; // Fallback image

  const handleClick = () => {
    if (onProductClick) {
      onProductClick(product);
    } else {
      // Default behavior - navigate to product detail page
      console.log("Product clicked:", product.name);
      // You can add navigation logic here when routing is implemented
      // window.location.href = `/product/${product.id}`;
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    console.log("Add to cart:", product.name);
    // Add to cart logic here
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    onProductClick(product);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    console.log("Add to wishlist:", product.name);
    // Add to wishlist logic here
  };

  // Generate random rating for demo
  const rating = Math.floor(Math.random() * 2) + 4; // 4-5 stars
  const reviewCount = Math.floor(Math.random() * 100) + 10;
  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-image-container">
        <img
          src={product.image || placeholderImage}
          alt={product.name || "No Image Available"}
          className="product-image"
        />
        <div className="product-badges">
          {product.isOnSale && <span className="badge sale">Sale</span>}
          {product.isNew && <span className="badge new">New</span>}
        </div>
        <div className="quick-actions">
          <button className="quick-action-btn" onClick={handleWishlist} title="Add to Wishlist">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <button className="quick-action-btn" onClick={handleQuickView} title="Quick View">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="product-details">
        <div className="product-brand">Brand</div>
        <h3>{product.name || "No Name Available"}</h3>
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`star ${i < rating ? '' : 'empty'}`}>★</span>
            ))}
          </div>
          <span className="rating-count">({reviewCount})</span>
        </div>
        <div className="product-price">
          {product.isOnSale ? (
            <>
              <span className="sale-price">${product.salePrice}</span>
              <span className="original-price">${product.price}</span>
              <span className="discount-percent">
                {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
              </span>
            </>
          ) : (
            <span className="current-price">${product.price || "0.00"}</span>
          )}
        </div>
        <div className="product-options">
          <div className="color-options">
            {product.colors?.slice(0, 4).map((color, index) => (
              <span
                key={index}
                className="color-option"
                style={{ backgroundColor: color }}
                title={`Color ${index + 1}`}
              ></span>
            ))}
          </div>
          <div className="size-options">
            {product.sizes?.slice(0, 3).map((size, index) => (
              <span key={index} className="size-option">
                {size}
              </span>
            ))}
          </div>
        </div>
        <button className="add-to-cart" onClick={handleAddToCart}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;