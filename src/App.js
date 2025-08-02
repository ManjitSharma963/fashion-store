import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import User from "./pages/User";
import SignOut from "./pages/SignOut";
import Orders from "./pages/Orders";
import "./styles/global.css";
import "./styles/auth.css";
import Header from "./components/Header";
import AuthModal from "./components/AuthModal";

const App = () => {
  // Demo: fake auth state
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => setUser(userData);
  const handleLogout = () => setUser(null);
  const handleSignup = (userData) => setUser(userData);

  // Auth modal state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalForm, setAuthModalForm] = useState("login");

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

  // Modal close handler
  const handleCloseModal = () => {
    setAuthModalOpen(false);
    window.history.pushState({}, "", "/");
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

  // Blur background when modal is open
  const blurClass = authModalOpen ? "blurred-bg" : "";

  return (
    <Router>
      <div className={blurClass}>
        <Header
          user={user}
          onLoginClick={openLoginModal}
          onSignupClick={openSignupModal}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Login and Signup routes removed, handled by modal */}
          <Route path="/orders" element={<Orders />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile onLogout={handleLogout} />} />
          <Route path="/user" element={<User onLogout={handleLogout} />} />
          <Route path="/signout" element={<SignOut onLogout={handleLogout} />} />
        </Routes>
      </div>
      {/* Auth Modal Popup */}
      {authModalOpen && (
        <AuthModal
          open={authModalOpen}
          onClose={handleCloseModal}
          initialForm={authModalForm}
        />
      )}
    </Router>
  );
};

export default App;