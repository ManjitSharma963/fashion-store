import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

const Checkout = ({ user, onAuthRequired }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", address: "", card: "" });
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Check for pending checkout from session storage
    const pendingCheckout = sessionStorage.getItem('pendingCheckout');
    if (pendingCheckout) {
      setCartItems(JSON.parse(pendingCheckout));
      sessionStorage.removeItem('pendingCheckout');
    } else {
      // Load from regular cart
      const savedCart = localStorage.getItem('cart');
      if (savedCart) setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    alert("Order placed successfully!");
    localStorage.removeItem('cart');
    sessionStorage.removeItem('pendingCheckout');
    navigate("/orders");
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: 40 }}>
        <h2>No items in cart</h2>
        <button onClick={() => navigate("/")}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <ProtectedRoute user={user} onAuthRequired={onAuthRequired}>
      <div style={{ padding: 40 }}>
        <h1>Checkout</h1>
        <form onSubmit={handleSubmit}>
          <input 
            name="name" 
            placeholder="Name" 
            value={form.name} 
            onChange={handleChange} 
            required 
          />
          <input 
            name="address" 
            placeholder="Address" 
            value={form.address} 
            onChange={handleChange} 
            required 
          />
          <input 
            name="card" 
            placeholder="Card Number" 
            value={form.card} 
            onChange={handleChange} 
            required 
          />
          <button type="submit">Place Order</button>
        </form>
        <div>
          <h3>Order Summary</h3>
          {cartItems.map(item => (
            <div key={`${item.id}-${item.color}-${item.size}`}>
              {item.name} x{item.qty} - ${item.price * item.qty}
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Checkout;