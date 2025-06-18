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
    if (!cityInput.trim()) return;

    setLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const data = await getWeather(cityInput.trim());
      setWeatherData(data);
    } catch (err) {
      setError("Could not fetch weather data. Please try again.");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleGPSLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      return;
    }

    setGpsLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          await new Promise((resolve) => setTimeout(resolve, 800));

          const cityName = await getCityFromCoordinates(latitude, longitude);
          setCityInput(cityName);

          const data = await getWeather(cityName);
          setWeatherData(data);
        } catch (err) {
          setError("Could not get weather for your location");
        } finally {
          setGpsLoading(false);
        }
      },
      (error) => {
        setError("Could not access your location. Please check permissions.");
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
      const data = await response.json();
      let cityName =
        data.city || data.locality || `${lat.toFixed(2)}, ${lng.toFixed(2)}`;

      if (cityName.includes("-")) {
        cityName = cityName.split("-")[0];
      }

      return cityName;
    } catch (error) {
      return `${lat.toFixed(2)}, ${lng.toFixed(2)}`;
    }
  };

  const containerClass = seamless
    ? styles.seamlessLightContainer
    : styles.weatherContainer;

  return (
    <div className={containerClass}>

      <form onSubmit={handleSearch} className={styles.searchSection}>
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Enter city name..."
          className={styles.searchInput}
        />

        {showGPS && (
          <button
            type="button"
            onClick={handleGPSLocation}
            disabled={gpsLoading}
            className={styles.gpsButton}
          >
            <span>{gpsLoading ? "🌍" : "📍"}</span>
          </button>
        )}
      </form>


      {error && (
        <div className={styles.errorSection}>
          <p className={styles.errorText}>{error}</p>
        </div>
      )}


      {weatherData ? (
        <div className={styles.weatherDisplay}>
          <div className={styles.weatherIcon}>🌤️</div>
          <div className={styles.temperature}>
            {weatherData.temperature}
            <span>°F</span>
          </div>
          <div className={styles.description}>{weatherData.description}</div>
          <div className={styles.location}>{weatherData.city}</div>
          <div className={styles.humidity}>
            Humidity: {weatherData.humidity}%
          </div>
        </div>
      ) : !loading ? (
        <div className={styles.noResults}>
          <h3 className={styles.title}>Search for Weather</h3>
          <p className={styles.message}>
            Enter a city name to get current weather conditions
          </p>
        </div>
      ) : (
        <div className={styles.loadingState}>
          <div className={styles.weatherIcon}>🌍</div>
          <p>Searching...</p>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
