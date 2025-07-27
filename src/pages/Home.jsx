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

  let cartTotal = cartItems.reduce((sum, item) => sum + Number(item.price) * item.qty, 0);
  if (isNaN(cartTotal)) cartTotal = 0;

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
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
    alert("Product added to cart!");
    closeProductModal();
  };

  // Filter products by selected category
  const filteredProducts = selectedCategory
    ? products.filter(product => getCategoryMatch(product, selectedCategory))
    : products.filter(product => product.isFeatured);

  return (
    <div>
      <HeroBanner />
      <section id="categories" className="categories">
        <h2>Categories</h2>
        <CategoryGrid 
          categories={categories} 
          onCategoryClick={handleCategoryClick}
        />
      </section>
      <section id="featured-products" className="featured-products">
        <h2>
          {selectedCategory ? (
            <>
              {selectedCategory.name} Products
              <button style={{ marginLeft: 16, fontSize: 13, padding: '2px 10px', borderRadius: 8, border: 'none', background: '#eee', cursor: 'pointer' }} onClick={clearCategoryFilter}>
                Show All
              </button>
            </>
          ) : (
            "Featured Products"
          )}
        </h2>
        <ProductGrid 
          products={filteredProducts} 
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