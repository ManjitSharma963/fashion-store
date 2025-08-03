import React, { useState } from "react";
import Footer from "../components/Footer";
import HeroBanner from "../components/HeroBanner";
import CategoryGrid from "../components/CategoryGrid";
import ProductGrid from "../components/ProductGrid";
import ProductDetailModal from "../components/ProductDetailModal";
import CartModal from "../components/CartModal";
import { products } from "../data/products";
import { categories } from "../data/categories";

const mockCartItems = [];

const getCategoryMatch = (product, category) => {
  // Try to match by image or by name substring (case-insensitive)
  if (!category) return true;
  const catName = category.name.toLowerCase();
  const prodName = product.name.toLowerCase();
  // Try to match by product image path containing category image filename
  if (product.image && category.image && product.image.toLowerCase().includes(category.image.split('/').pop().toLowerCase().split('.')[0])) {
    return true;
  }
  // Fallback: match by name
  return prodName.includes(catName) || catName.includes(prodName);
};

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCartModal, setShowCartModal] = useState(false);
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);

  let cartTotal = cartItems.reduce((sum, item) => sum + Number(item.price) * item.qty, 0);
  if (isNaN(cartTotal)) cartTotal = 0;

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // Smooth scroll to products section
    document.getElementById('featured-products')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const clearCategoryFilter = () => setSelectedCategory(null);

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  // Cart modal handlers
  const closeCartModal = () => setShowCartModal(false);
  const handleQtyChange = (id, qty) => {
    setCartItems(items => items.map(item => item.id === id ? { ...item, qty: Math.max(1, qty) } : item));
  };
  const handleRemove = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };
  const handleCheckout = () => {
    alert("Proceeding to checkout!");
  };

  // Add to cart handler
  const handleAddToCart = (cartItem) => {
    setCartItems(items => {
      const existing = items.find(item =>
        item.id === cartItem.id &&
        item.color === cartItem.color &&
        item.size === cartItem.size
      );
      if (existing) {
        return items.map(item =>
          item.id === cartItem.id && item.color === cartItem.color && item.size === cartItem.size
            ? { ...item, qty: item.qty + cartItem.qty }
            : item
        );
      } else {
        return [...items, cartItem];
      }
    });
    // Show success notification instead of alert
    const notification = document.createElement('div');
    notification.textContent = 'Product added to cart!';
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 600;
      z-index: 10000;
      animation: slideIn 0.3s ease-out;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.remove();
    }, 3000);
    closeProductModal();
  };

  // Add to wishlist handler
  const handleAddToWishlist = (product) => {
    setWishlistItems(items => {
      const exists = items.find(item => item.id === product.id);
      if (exists) {
        return items.filter(item => item.id !== product.id);
      } else {
        return [...items, product];
      }
    });
  };

  // Filter products by selected category
  const filteredProducts = selectedCategory
    ? products.filter(product => getCategoryMatch(product, selectedCategory))
    : products.filter(product => product.isFeatured);

  return (
    <main id="main-content">
      <HeroBanner />
      
      <CategoryGrid 
        categories={categories} 
        onCategoryClick={handleCategoryClick}
      />
      
      <ProductGrid 
        products={filteredProducts} 
        onProductClick={handleProductClick}
        selectedCategory={selectedCategory}
        onClearFilter={clearCategoryFilter}
      />
      
      <Footer />
      
      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={closeProductModal}
          onProductClick={handleProductClick}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          isWishlisted={wishlistItems.some(item => item.id === selectedProduct.id)}
        />
      )}
      
      {/* Cart Modal */}
      {showCartModal && (
        <CartModal
          cartItems={cartItems}
          onClose={closeCartModal}
          onQtyChange={handleQtyChange}
          onRemove={handleRemove}
          onCheckout={handleCheckout}
        />
      )}
    </main>
  );
};

export default Home;