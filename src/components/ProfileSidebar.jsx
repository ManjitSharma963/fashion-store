import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const links = [
  { label: "Orders", to: "/orders" },
  { label: "Wishlist", to: "/wishlist" },
  { label: "Gift Cards", to: "/gift-cards" },
  { label: "Contact Us", to: "/contact" },
  { label: "Myntra Insider", to: "/insider", badge: "New" },
  { label: "Myntra Credit", to: "/credit" },
  { label: "Coupons", to: "/coupons" },
  { label: "Saved Cards", to: "/saved-cards" },
  { label: "Saved VPA", to: "/saved-vpa" },
  { label: "Saved Addresses", to: "/addresses" },
];

const ProfileSidebar = ({ open, onClose, user, onAuthClick }) => {
  const sidebarRef = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        onClose();
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="profile-sidebar-backdrop">
      <aside className="profile-sidebar" ref={sidebarRef}>
        <button className="profile-sidebar-close" onClick={onClose}>×</button>
        <div className="profile-sidebar-content">
          {!user && (
            <>
              <h3>Welcome</h3>
              <p style={{ color: '#888', marginBottom: 18 }}>To access account and manage orders</p>
              <button className="profile-sidebar-login-btn" onClick={() => { onClose(); if (onAuthClick) onAuthClick(); }}>
                LOGIN / SIGNUP
              </button>
            </>
          )}
          <ul className="profile-sidebar-links">
            {links.map(link => (
              <li key={link.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Link to={link.to} onClick={onClose}>{link.label}</Link>
                {link.badge && <span className="profile-sidebar-badge">{link.badge}</span>}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default ProfileSidebar; 