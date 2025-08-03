import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Wishlist from "./pages/Wishlist";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import User from "./pages/User";
import SignOut from "./pages/SignOut";
import Orders from "./pages/Orders";
import Error404 from "./pages/Error404";
import "./styles/global.css";
import "./styles/auth.css";
import Header from "./components/Header";
import AuthModal from "./components/AuthModal";
import CartModal from "./components/CartModal";

const App = () => {
  // Demo: fake auth state
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const handleLogin = (userData) => setUser(userData);
  const handleLogout = () => setUser(null);
  const handleSignup = (userData) => setUser(userData);

  // Auth modal state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalForm, setAuthModalForm] = useState("login");
  
  // Cart modal state
  const [cartModalOpen, setCartModalOpen] = useState(false);

  // Calculate cart totals
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

  // Listen for route changes
  React.useEffect(() => {
    const path = window.location.pathname;
    if (path === "/login") {
      setAuthModalForm("login");
      setAuthModalOpen(true);
    } else if (path === "/signup") {
      setAuthModalForm("signup");
      setAuthModalOpen(true);
    } else {
      setAuthModalOpen(false);
    }
  }, []);

  // Load cart from localStorage on mount
  React.useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (savedWishlist) setWishlistItems(JSON.parse(savedWishlist));
  }, []);

  // Save cart to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save wishlist to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Modal close handler
  const handleCloseModal = () => {
    setAuthModalOpen(false);
    window.history.pushState({}, "", "/");
  };

  // Handle auth required (for protected routes)
  const handleAuthRequired = () => {
    setAuthModalForm("login");
    setAuthModalOpen(true);
  };

  // Modal open handlers for sidebar/profile
  const openLoginModal = () => {
    setAuthModalForm("login");
    setAuthModalOpen(true);
    window.history.pushState({}, "", "/login");
  };
  const openSignupModal = () => {
    setAuthModalForm("signup");
    setAuthModalOpen(true);
    window.history.pushState({}, "", "/signup");
  };

  // Cart handlers
  const handleCartClick = () => {
    setCartModalOpen(true);
  };

  const handleCartClose = () => {
    setCartModalOpen(false);
  };

  const handleQtyChange = (itemId, color, size, newQty) => {
    if (newQty < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === itemId && item.color === color && item.size === size
          ? { ...item, qty: newQty }
          : item
      )
    );
  };

  const handleRemoveFromCart = (itemId, color, size) => {
    setCartItems(items =>
      items.filter(item =>
        !(item.id === itemId && item.color === color && item.size === size)
      )
    );
  };

  const handleCheckout = () => {
    if (!user) {
      handleAuthRequired();
      return;
    }
    setCartModalOpen(false);
    window.location.href = '/checkout';
  };

  // Blur background when modal is open
  const blurClass = (authModalOpen || cartModalOpen) ? "blurred-bg" : "";

  return (
    <Router>
      <div className={blurClass}>
        <Header
          user={user}
          cartCount={cartCount}
          cartTotal={cartTotal}
          wishlistCount={wishlistItems.length}
          onCartClick={handleCartClick}
          onLoginClick={openLoginModal}
          onSignupClick={openSignupModal}
        />
        <Routes>
          <Route path="/" element={
            <Home 
              cartItems={cartItems}
              setCartItems={setCartItems}
              wishlistItems={wishlistItems}
              setWishlistItems={setWishlistItems}
            />
          } />
          <Route path="/cart" element={
            <Cart 
              user={user} 
              onAuthRequired={handleAuthRequired}
            />
          } />
          <Route path="/checkout" element={
            <Checkout 
              user={user} 
              onAuthRequired={handleAuthRequired}
            />
          } />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/wishlist" element={<Wishlist />} />
          {/* Login and Signup routes removed, handled by modal */}
          <Route path="/orders" element={<Orders />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile onLogout={handleLogout} />} />
          <Route path="/user" element={<User onLogout={handleLogout} />} />
          <Route path="/signout" element={<SignOut onLogout={handleLogout} />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
      
      {/* Auth Modal Popup */}
      {authModalOpen && (
        <AuthModal
          open={authModalOpen}
          onClose={handleCloseModal}
          initialForm={authModalForm}
          onLogin={handleLogin}
          onSignup={handleSignup}
        />
      )}
      
      {/* Cart Modal */}
      {cartModalOpen && (
        <CartModal
          cartItems={cartItems}
          onClose={handleCartClose}
          onQtyChange={handleQtyChange}
          onRemove={handleRemoveFromCart}
          onCheckout={handleCheckout}
        />
      )}
    </Router>
  );
};

export default App;