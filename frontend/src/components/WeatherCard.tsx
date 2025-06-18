import React, { useState } from "react";
import { getWeather } from "../services/getWeatherData";
import { WeatherData } from "../types/weather";
import styles from "./WeatherCard.module.css";

interface WeatherCardProps {
  showGPS?: boolean;
  seamless?: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  showGPS = false,
  seamless = false,
}) => {
  const [cityInput, setCityInput] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cityInput.trim()) {
      setError("Please enter a city name."); // More specific error
      return;
    }

    setLoading(true);
    setError(""); // Clear previous errors

    try {
      // await new Promise((resolve) => setTimeout(resolve, 800)); // Consider removing this for production
      const data = await getWeather(cityInput.trim());
      setWeatherData(data);
    } catch (err) {
      console.error("Error fetching weather data:", err); // Log the actual error
      setError("Could not fetch weather data. Please try again.");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleGPSLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setGpsLoading(true);
    setError(""); // Clear previous errors

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          // await new Promise((resolve) => setTimeout(resolve, 800)); // Consider removing this for production

          const cityName = await getCityFromCoordinates(latitude, longitude);
          setCityInput(cityName); // Set the city input for consistency

          const data = await getWeather(cityName);
          setWeatherData(data);
        } catch (err) {
          console.error("Error getting GPS weather:", err); // Log the actual error
          setError("Could not get weather for your location.");
          setWeatherData(null);
        } finally {
          setGpsLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error); // Log the actual geolocation error
        let errorMessage =
          "Could not access your location. Please check permissions.";
        if (error.code === error.PERMISSION_DENIED) {
          errorMessage =
            "Location access denied. Please enable it in your browser settings.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMessage = "Location information is unavailable.";
        } else if (error.code === error.TIMEOUT) {
          errorMessage = "The request to get user location timed out.";
        }
        setError(errorMessage);
        setGpsLoading(false);
      }
    );
  };

  const getCityFromCoordinates = async (
    lat: number,
    lng: number
  ): Promise<string> => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      let cityName =
        data.city ||
        data.locality ||
        data.principalSubdivision ||
        `${lat.toFixed(2)}, ${lng.toFixed(2)}`;

      // Clean up city names if they contain hyphens (e.g., "New-York")
      if (cityName.includes("-")) {
        cityName = cityName.split("-")[0].trim();
      }

      return cityName;
    } catch (error) {
      console.error("Error reverse geocoding:", error);
      return `${lat.toFixed(2)}, ${lng.toFixed(2)}`; // Fallback to coordinates
    }
  };

  const containerClass = seamless
    ? styles.seamlessLightContainer // Assuming seamlessLightContainer is the desired seamless style
    : styles.weatherContainer;

  // Determine the display state
  const renderContent = () => {
    if (error) {
      return (
        <div className={styles.errorSection}>
          <p className={styles.errorText}>{error}</p>
        </div>
      );
    } else if (loading || gpsLoading) {
      return (
        <div className={styles.loadingState}>
          <div className={styles.weatherIcon}>🌍</div>
          <p>Searching...</p>
        </div>
      );
    } else if (weatherData) {
      return (
        <div className={styles.weatherDisplay}>
          <div className={styles.mainWeatherContainer}>
            <div className={styles.mainWeatherContent}>
              <img
                src={weatherData.iconUrl}
                alt="Weather Icon"
                className={styles.weatherIcon}
              />
              <div className={styles.temperature}>
                {weatherData.temperature}
                <span>°F</span>
              </div>
            </div>
            <div className={styles.description}>{weatherData.description}</div>
          </div>

          <div className={styles.weatherDetails}>
            <div className={`${styles.weatherDetailBox} ${styles.feelsLike}`}>
              Feels like: {weatherData.feels_Like}°F
            </div>
            <div className={`${styles.weatherDetailBox} ${styles.humidity}`}>
              Humidity: {weatherData.humidity}%
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.noResults}>
          <h3 className={styles.title}>Search for Weather</h3>
          <p className={styles.message}>
            Enter a city name or use GPS to get current weather conditions
          </p>
        </div>
      );
    }
  };

  return (
    <div className={containerClass}>
      <form onSubmit={handleSearch} className={styles.searchSection}>
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Enter city name..."
          className={styles.searchInput}
          disabled={loading || gpsLoading} // Disable input during loading
        />

        {showGPS && (
          <button
            type="button"
            onClick={handleGPSLocation}
            disabled={gpsLoading || loading} // Disable GPS button if either is loading
            className={styles.gpsButton}
            aria-label="Get current location weather"
          >
            <span>{gpsLoading ? "🌍" : "📍"}</span>
          </button>
        )}
      </form>

      {renderContent()}
    </div>
  );
};

export default WeatherCard;
