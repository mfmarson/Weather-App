import React from "react";
import { useNavigate } from "react-router-dom";
import WeatherSearch from "../components/WeatherSearch";

const GuestDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <h1>Weather Search</h1>
        <p>Enter any city to get current weather conditions</p>
      </div>

      <WeatherSearch showGPS={false} />

      <div>
        <h3>Want More Features?</h3>

        <button onClick={() => navigate("/register")}>
          Create Free Account
        </button>
      </div>
    </div>
  );
};

export default GuestDashboard;
