import React, { useState, useEffect } from "react";
import "../styles/auth.css";

const LockIcon = () => (
  <svg width="100" height="100" viewBox="0 0 64 64" fill="none">
    <rect x="16" y="28" width="32" height="24" rx="8" fill="#e0f2fe" />
    <path d="M20 28v-6a12 12 0 1 1 24 0v6" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="32" cy="40" r="4" fill="#38bdf8" />
    <path d="M32 44v4" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const AuthModal = ({ open, onClose, initialForm = "login" }) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    setForm(initialForm);
  }, [initialForm, open]);

  if (!open) return null;

  return (
    <div className="auth-glass-modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="auth-glass-modal">
        <div className="auth-glass-left">
          <h2>{form === "login" ? "LOGIN" : "SIGN UP"}</h2>
          <form className="auth-glass-form">
            {form === "signup" && (
              <>
                <input id="name" type="text" placeholder="Enter your name" className="auth-glass-input" required />
              </>
            )}
            <input id="email" type="email" placeholder={form === "login" ? "Enter your username" : "Enter your email"} className="auth-glass-input" required />
            <input id="password" type="password" placeholder="Enter your password" className="auth-glass-input" required />
            <button type="submit" className="auth-glass-btn">{form === "login" ? "SIGN IN" : "SIGN UP"}</button>
          </form>
          <div className="auth-glass-switch">
            {form === "login" ? (
              <>
                Don’t have an account?{' '}
                <span className="auth-glass-link" onClick={() => setForm("signup")}>Sign Up</span>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <span className="auth-glass-link" onClick={() => setForm("login")}>Sign In</span>
              </>
            )}
          </div>
        </div>
        <div className="auth-glass-right">
          <LockIcon />
        </div>
        <button className="auth-glass-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default AuthModal; 