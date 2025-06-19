import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WeatherCard from "../components/WeatherCard";
import styles from "./WeatherDashboard.module.css";

interface User {
  userId: string;
  email: string;
  favorites?: FavoriteLocation[];
}

interface FavoriteLocation {
  id: string;
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  iconCode: string;
  iconUrl: string;
}

const WeatherDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteLocation[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("authToken");

    if (userData && token) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsLoggedIn(true);

        // Set favorites from user data if available
        if (parsedUser.favorites) {
          setFavorites(parsedUser.favorites);
        }
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
    setFavorites([]);
    navigate("/");
  };

  const handleFavoriteClick = (cityName: string) => {
    console.log(`Selected favorite city: ${cityName}`);
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
          <span>
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className={`${styles.button} ${styles.loginButton}`}
              >
                Logout
              </button>
            )}
          </span>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.weatherSection}>
            <WeatherCard showGPS={true} seamless={true} />
          </div>

          {isLoggedIn && (
            <div className={styles.favoritesSection}>
              <h3 className={styles.sectionTitle}>⭐ Your Locations</h3>

              {favorites.length > 0 ? (
                <div className={styles.favoritesGrid}>
                  {favorites.map((favorite) => (
                    <div
                      key={favorite.id}
                      className={styles.favoriteCard}
                      onClick={() => handleFavoriteClick(favorite.city)}
                    >
                      <div className={styles.favoriteHeader}>
                        <h4 className={styles.cityName}>{favorite.city}</h4>
                        <img
                          src={favorite.iconUrl}
                          alt={favorite.description}
                          className={styles.favoriteIcon}
                        />
                      </div>

                      <div className={styles.favoriteDetails}>
                        <div className={styles.temperature}>
                          {favorite.temperature.toFixed(1)}°F
                        </div>
                        <div className={styles.description}>
                          {favorite.description}
                        </div>
                        <div className={styles.humidity}>
                          Humidity: {favorite.humidity}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.comingSoon}>
                  <p>Save your favorite cities for quick weather access!</p>
                </div>
              )}
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
