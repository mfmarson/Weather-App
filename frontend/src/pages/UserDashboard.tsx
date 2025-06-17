import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WeatherSearch from "../components/WeatherSearch";

const UserDashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("authToken");

    if (!userData || !token) {
      // No user data or token, redirect to login
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear localStorage and redirect
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      {/* Header with user info and logout */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
          borderBottom: "1px solid #ccc",
          paddingBottom: "1rem",
        }}
      >
        <div>
          <h1>Weather Dashboard</h1>
          <p>Welcome back, {user.email}!</p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* Weather Search Component */}
      <WeatherSearch showGPS={true} />

      {/* Placeholder for future features */}
      <div
        style={{
          marginTop: "3rem",
          padding: "1rem",
          backgroundColor: "#f8f9fa",
          borderRadius: "4px",
        }}
      >
        <h3>Coming Soon:</h3>
        <ul>
          <li>📍 GPS Location Weather</li>
          <li>⭐ Saved Locations</li>
          <li>📊 Weather History</li>
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
