import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import WeatherDashboard from "./pages/WeatherDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/guest" element={<WeatherDashboard />} />
        <Route path="/dashboard" element={<WeatherDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
