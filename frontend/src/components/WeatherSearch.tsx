import React, { useState } from "react";
import { getWeather } from "../services/getWeatherData";
import { WeatherData } from "../types/weather";

interface WeatherSearchProps {
  showGPS?: boolean;
}

const WeatherSearch: React.FC<WeatherSearchProps> = ({ showGPS = false }) => {
  const [cityInput, setCityInput] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!cityInput.trim()) return;

    setLoading(true);
    setError("");

    try {
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
          console.log("GPS coordinates:", latitude, longitude);

          // For now, we'll use a reverse geocoding approach
          // Convert coordinates to city name, then use existing weather function
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

  // geocoding function to convert coordinates to city name
  const getCityFromCoordinates = async (
    lat: number,
    lng: number
  ): Promise<string> => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
      const data = await response.json();
      return (
        data.city || data.locality || `${lat.toFixed(2)}, ${lng.toFixed(2)}`
      );
    } catch (error) {
      return `${lat.toFixed(2)}, ${lng.toFixed(2)}`;
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Enter city name..."
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* GPS Button - only show for logged-in users */}
      {showGPS && (
        <div>
          <button onClick={handleGPSLocation} disabled={gpsLoading}>
            {gpsLoading ? "Getting Location..." : "📍 Use My Location"}
          </button>
        </div>
      )}

      {error && <div>{error}</div>}

      {weatherData && (
        <div>
          <h3>{weatherData.city}</h3>
          <p>
            <strong>Temperature:</strong> {weatherData.temperature}°F
          </p>
          <p>
            <strong>Description:</strong> {weatherData.description}
          </p>
          <p>
            <strong>Humidity:</strong> {weatherData.humidity}%
          </p>
        </div>
      )}
    </div>
  );
};

export default WeatherSearch;
