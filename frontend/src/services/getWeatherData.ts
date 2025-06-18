import { WeatherData } from "../types/weather";
import { API_CONFIG } from "../config/api";

export const getWeather = async (cityName: string): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${API_CONFIG.baseURL}${API_CONFIG.endpoints.weather}?city=${cityName}`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
};
