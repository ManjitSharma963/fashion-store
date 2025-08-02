import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/cart.css";

const Cart = ({ user, onAuthRequired }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setLoading(false);
  }, []);

  // Update localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (itemId, color, size, newQty) => {
    if (newQty < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === itemId && item.color === color && item.size === size
          ? { ...item, qty: newQty }
          : item
      )
    );
  };

  const removeItem = (itemId, color, size) => {
    setCartItems(items =>
      items.filter(item =>
        !(item.id === itemId && item.color === color && item.size === size)
      )
    );
  };

  const getSubtotal = () =>
    cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const getShipping = () => (getSubtotal() > 50 ? 0 : 5.99);

  const getTotal = () => getSubtotal() + getShipping();

  const handleCheckout = () => {
    if (!user) {
      // Store current cart state
      sessionStorage.setItem('pendingCheckout', JSON.stringify(cartItems));
      // Trigger auth modal
      onAuthRequired();
      return;
    }
    // User is logged in, proceed to checkout
    navigate("/checkout");
  };

  if (loading) {
    return <div className="cart-loading">Loading cart...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
          <button onClick={() => navigate("/")} className="continue-shopping-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <span className="cart-count">{cartItems.length} items</span>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={`${item.id}-${item.color}-${item.size}`} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <div className="cart-item-options">
                    <span>Color: {item.color}</span> | <span>Size: {item.size}</span>
                  </div>
                  <div className="cart-item-price">${item.price}</div>
                </div>
                <div className="cart-item-quantity">
                  <button onClick={() => updateQuantity(item.id, item.color, item.size, item.qty - 1)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQuantity(item.id, item.color, item.size, item.qty + 1)}>+</button>
                </div>
                <div className="cart-item-total">
                  ${(item.price * item.qty).toFixed(2)}
                </div>
                <button
                  className="remove-item-btn"
                  onClick={() => removeItem(item.id, item.color, item.size)}
                  title="Remove item"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${getSubtotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{getShipping() === 0 ? 'Free' : `$${getShipping().toFixed(2)}`}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>
            
            {!user && (
              <div style={{ 
                background: '#fef3c7', 
                padding: '12px', 
                borderRadius: '6px', 
                marginBottom: '12px',
                fontSize: '0.9rem',
                color: '#92400e'
              }}>
                ⚠️ Please login to proceed with checkout
              </div>
            )}
            
            <button
              className="checkout-btn"
              onClick={handleCheckout}
            >
              {user ? "Proceed to Checkout" : "Login to Checkout"}
            </button>
            <button
              className="continue-shopping-btn"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 