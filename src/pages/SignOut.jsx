import React, { useEffect } from "react";

const SignOut = ({ onLogout }) => {
  useEffect(() => {
    if (onLogout) onLogout();
    // Optionally redirect after 1.5s
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  }, [onLogout]);

  return (
    <div className="auth-page">
      <h2>Signed Out</h2>
      <p>You have been signed out. Redirecting...</p>
    </div>
  );
};

export default SignOut; 