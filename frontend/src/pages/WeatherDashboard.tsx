import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WeatherCard from "../components/WeatherCard";
import styles from "./WeatherDashboard.module.css";

interface User {
  userId: string;
  email: string;
}

const WeatherDashboard: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("authToken");

    if (userData && token) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.appContainer}>
        <div className={styles.appHeader}>
          <div className={styles.brandSection}>
            <h1 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
              <img
                src="/my-icon.png"
                alt="The Daily Drizzle"
                className={styles.logo}
              />{" "}
              The Daily Drizzle
            </h1>
          </div>

          <div className={styles.actionSection}>
            {isLoggedIn && ( // ONLY render if isLoggedIn is true
              <button
                onClick={handleLogout}
                className={`${styles.button} ${styles.loginButton}`}
              >
                Logout
              </button>
            )}
          </div>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.weatherSection}>
            <WeatherCard showGPS={true} seamless={true} />{" "}
          </div>

          {isLoggedIn && (
            <div className={styles.favoritesSection}>
              <h3 className={styles.sectionTitle}>⭐ Favorite Locations</h3>
              <div className={styles.comingSoon}>
                <p>Save your favorite cities for quick weather access!</p>
              </div>
            </div>
          )}

          {!isLoggedIn && (
            <div className={styles.ctaSection}>
              <h3 className={styles.sectionTitle}>
                ⭐️ Favorite Your Forecasts
              </h3>
              <div className={styles.ctaContent}>
                <p className={styles.ctaDescription}>
                  Create a free account to save your favorite locations.
                </p>

                <button
                  onClick={() => navigate("/register")}
                  className={styles.ctaButton}
                >
                  Create Free Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
