import { WeatherData } from "../types/weather";

const API_BASE_URL =
  "https://ri6kcctu7e.execute-api.us-east-2.amazonaws.com/stage";

export const getWeather = async (cityName: string): Promise<WeatherData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/weather?city=${cityName}`);

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
