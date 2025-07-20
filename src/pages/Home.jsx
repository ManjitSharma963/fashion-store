import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroBanner from "../components/HeroBanner";
import CategoryGrid from "../components/CategoryGrid";
import ProductGrid from "../components/ProductGrid";
import ProductDetailModal from "../components/ProductDetailModal";
import CartModal from "../components/CartModal";
import { products } from "../data/products";
import { categories } from "../data/categories";

const mockCartItems = [];

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCartModal, setShowCartModal] = useState(false);
  const [cartItems, setCartItems] = useState(mockCartItems);
  const featuredProducts = products.filter((product) => product.isFeatured);

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  let cartTotal = cartItems.reduce((sum, item) => sum + Number(item.price) * item.qty, 0);
  if (isNaN(cartTotal)) cartTotal = 0;

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCategoryClick = (category) => {
    alert(`You clicked on: ${category.name}\nItems available: ${category.count}`);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  // Cart modal handlers
  const openCartModal = () => setShowCartModal(true);
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
    alert("Product added to cart!");
    closeProductModal();
  };

  return (
    <div>
      <Header 
        onCartClick={openCartModal} 
        cartCount={cartCount}
        cartTotal={cartTotal}
      />
      <HeroBanner />
      <section id="categories" className="categories">
        <h2>Categories</h2>
        <CategoryGrid 
          categories={categories} 
          onCategoryClick={handleCategoryClick}
        />
      </section>
      <section id="featured-products" className="featured-products">
        <h2>Featured Products</h2>
        <ProductGrid 
          products={featuredProducts} 
          onProductClick={handleProductClick}
        />
      </section>
      <Footer />
      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={closeProductModal}
          onProductClick={handleProductClick}
          onAddToCart={handleAddToCart}
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
    </div>
  );
};

export default Home;