export interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
}

export interface WeatherResponnse {
  data?: WeatherData;
  error?: string;
}
