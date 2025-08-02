import React from "react";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: 40 }}>
      <h1>404 - Page Not Found</h1>
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  );
};

export default Error404;