import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="auth-page">
      <h2>Forgot Password</h2>
      {submitted ? (
        <p>Check your email for password reset instructions.</p>
      ) : (
        <form onSubmit={handleSubmit} className="auth-form">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <button type="submit">Send Reset Link</button>
        </form>
      )}
      <div className="auth-links">
        <a href="#login">Back to Login</a>
      </div>
    </div>
  );
};

export default ForgotPassword; 