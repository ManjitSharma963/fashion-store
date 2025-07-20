import React, { useState, useEffect } from "react";
import { FaHeart, FaTimes, FaShoppingCart } from "react-icons/fa";
import { products } from "../data/products";
import "../styles/productDetailModal.css";

const ProductDetailModal = ({ product, onClose, onProductClick, onAddToCart }) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Generate multiple images for the product (in a real app, these would come from the API)
  const productImages = [
    product?.image || "/images/placeholder.jpg",
    product?.image || "/images/placeholder.jpg", // Additional views would be different images
    product?.image || "/images/placeholder.jpg",
  ];

  // Get similar products (excluding current product)
  const getSimilarProducts = () => {
    if (!product) return [];
    const similarProducts = products
      .filter(p => p.id !== product.id && p.isFeatured)
      .slice(0, 4);
    return similarProducts;
  };
  const similarProducts = getSimilarProducts();

  useEffect(() => {
    if (product) {
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("Please select both color and size");
      return;
    }
    const cartItem = {
      id: product.id,
      name: product.name,
      sku: product.sku || product.id,
      price: Number(product.isOnSale ? product.salePrice : product.price),
      color: selectedColor,
      size: selectedSize,
      qty: quantity,
      image: product.image,
    };
    if (onAddToCart) onAddToCart(cartItem);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSimilarProductClick = (similarProduct) => {
    onClose();
    setTimeout(() => {
      onProductClick(similarProduct);
    }, 100);
  };

  if (!product) return null;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="product-detail-modal">
        <button className="modal-close-btn" onClick={onClose}>
          <FaTimes />
        </button>
        <div className="modal-content">
          {/* Product Images Section */}
          <div className="product-images-section">
            <div className="main-image-container">
              <button className="image-nav prev" onClick={prevImage}>
                ‹
              </button>
              <img
                src={productImages[currentImageIndex]}
                alt={product.name}
                className="main-product-image"
              />
              <button className="image-nav next" onClick={nextImage}>
                ›
              </button>
              <div className="image-indicators">
                {productImages.map((_, index) => (
                  <span
                    key={index}
                    className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>
            <div className="thumbnail-images">
              {productImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="product-details-section">
            <h1 className="product-title">{product.name}</h1>
            {/* Color Selection */}
            <div className="product-option">
              <h3>Select Color</h3>
              <div className="color-options">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    title={`Color ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            {/* Size Selection */}
            <div className="product-option">
              <h3>Size</h3>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="size-select"
              >
                {product.sizes.map((size, index) => (
                  <option key={index} value={size}>{size}</option>
                ))}
              </select>
            </div>
            {/* Quantity Selection */}
            <div className="product-option">
              <h3>Quantity</h3>
              <div className="quantity-selector">
                <button onClick={() => handleQuantityChange(-1)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantityChange(1)}>+</button>
              </div>
            </div>
            {/* Price and Actions */}
            <div className="price-section">
              <div className="price-display">
                {product.isOnSale ? (
                  <>
                    <span className="sale-price">{product.salePrice}</span>
                    <span className="original-price">{product.price}</span>
                  </>
                ) : (
                  <span className="price">{product.price}</span>
                )}
              </div>
              <div className="action-buttons">
                <button className="wishlist-btn">
                  <FaHeart />
                </button>
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  <FaShoppingCart /> Add to Bag
                </button>
              </div>
            </div>
            {/* Product Information */}
            <div className="product-info">
              <div className="info-section">
                <h3>Details</h3>
                <ul>
                  <li>Design {product.name.toLowerCase()} made of premium materials</li>
                  <li>High-quality construction</li>
                  <li>Comfortable fit</li>
                  <li>Available in multiple colors and sizes</li>
                </ul>
              </div>
              <div className="info-section">
                <h3>Sizing</h3>
                <p>Please refer to our size chart for accurate measurements. This item runs true to size.</p>
              </div>
              <div className="info-section">
                <h3>Shipping</h3>
                <p>Free shipping on orders over $50. Standard delivery: 3-5 business days.</p>
              </div>
            </div>
          </div>
        </div>
        {/* Similar Items Section */}
        {similarProducts.length > 0 && (
          <div className="similar-items-section">
            <h2>Similar Items</h2>
            <div className="similar-items-grid">
              {similarProducts.map((similarProduct) => (
                <div
                  key={similarProduct.id}
                  className="similar-item-card"
                  onClick={() => handleSimilarProductClick(similarProduct)}
                >
                  <div className="similar-item-image-container">
                    <img
                      src={similarProduct.image}
                      alt={similarProduct.name}
                      className="similar-item-image"
                    />
                    {similarProduct.isOnSale && (
                      <span className="similar-item-badge sale">Sale</span>
                    )}
                    {similarProduct.isNew && (
                      <span className="similar-item-badge new">New</span>
                    )}
                  </div>
                  <div className="similar-item-details">
                    <h3 className="similar-item-name">{similarProduct.name}</h3>
                    <div className="similar-item-price">
                      {similarProduct.isOnSale ? (
                        <>
                          <span className="similar-sale-price">{similarProduct.salePrice}</span>
                          <span className="similar-original-price">{similarProduct.price}</span>
                        </>
                      ) : (
                        <span className="similar-price">{similarProduct.price}</span>
                      )}
                    </div>
                    <div className="similar-item-colors">
                      {similarProduct.colors.slice(0, 3).map((color, index) => (
                        <span
                          key={index}
                          className="similar-color-circle"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailModal; 