import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, user, onAuthRequired }) => {
  const location = useLocation();

  if (!user) {
    // Store the intended destination for redirect after login
    sessionStorage.setItem('redirectAfterLogin', location.pathname);
    
    // Trigger auth modal
    if (onAuthRequired) {
      onAuthRequired();
    }
    
    // Redirect to home page (auth modal will be triggered)
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute; 