// Landing page component for the weather app

import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>The Daily Drizzle</h1>
      <p>
        Welcome to The Daily Drizzle, your go-to source for accurate and
        up-to-date weather information.
      </p>
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/register")}>Register</button>
      <button onClick={() => navigate("/guest")}>Continue as a Guest</button>
    </div>
  );
};

export default LandingPage;
