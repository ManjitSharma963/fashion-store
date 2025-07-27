import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheck, FaFacebookF, FaTwitter, FaInstagram, FaTimes } from "react-icons/fa";

const SignInModal = ({ open, onClose }) => {
  const modalRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(false);

  useEffect(() => {
    function handleClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  useEffect(() => {
    setEmailValid(email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email));
  }, [email]);

  if (!open) return null;

  return (
    <div className="signin-modal-backdrop">
      <aside className="signin-modal" ref={modalRef}>
        <button className="signin-modal-close" onClick={onClose}><FaTimes /></button>
        <div className="signin-modal-header">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" className="signin-modal-avatar" />
          <div className="signin-modal-welcome">Welcome</div>
          <div className="signin-modal-title">Sign In</div>
        </div>
        <form className="signin-modal-form">
          <label>Email</label>
          <div className="signin-modal-input-wrap">
            <input type="email" placeholder="Urmail@gmail.com" value={email} onChange={e => setEmail(e.target.value)} required />
            {emailValid && <FaCheck className="signin-modal-check" />}
          </div>
          <label>Password</label>
          <input type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <div className="signin-modal-forgot">Forget Password ?</div>
          <button type="submit" className="signin-modal-btn">Sign In</button>
        </form>
        <div className="signin-modal-or">OR</div>
        <div className="signin-modal-socials">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaInstagram /></a>
        </div>
        <div className="signin-modal-bottom-link">
          Don’t have an account ? <Link to="/signup" onClick={onClose}>SignUp</Link>
        </div>
      </aside>
    </div>
  );
};

export default SignInModal; 