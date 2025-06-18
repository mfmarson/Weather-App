export interface WeatherData {
  feels_like: number;
  temperature: number;
  description: string;
  humidity: number;
  iconCode: string;
  iconUrl: string;
  weatherId: number;
  main: string;
}

export interface WeatherResponnse {
  data?: WeatherData;
  error?: string;
}
