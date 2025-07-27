import React from "react";
import { Link } from "react-router-dom";

const User = ({ onLogout }) => (
  <div className="profile-page">
    <h2>User Dashboard</h2>
    <div className="profile-info">
      <p>Welcome to your account dashboard.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Link to="/profile" className="auth-form-btn">Profile</Link>
        <Link to="/orders" className="auth-form-btn">My Orders</Link>
        <button className="logout-btn" onClick={onLogout}>Sign Out</button>
      </div>
    </div>
  </div>
);

export default User; 