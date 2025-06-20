export const handler = async (event) => {
  const API_KEY = process.env.OPENWEATHER_API_KEY;

  try {
    const city = event.queryStringParameters?.city;
    if (!city) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Please enter a city.' })
      };
    }
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`;
    
    const response = await fetch(url);
    const weatherData = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: weatherData.message })
      };  
    }

    const weather = weatherData.weather[0];
    const iconCode = weather.icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        description: weatherData.weather[0].description,
        temperature: weatherData.main.temp,
        feels_like: weatherData.main.feels_like,
        humidity: weatherData.main.humidity,
        iconCode: iconCode,
        iconUrl: iconUrl,
        weatherId: weatherData.id,
        main: weatherData.main
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};