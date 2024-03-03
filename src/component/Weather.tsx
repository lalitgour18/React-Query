import React, { useState } from 'react';
import axios from 'axios';

export interface WeatherData {
    weather: {
      main: string;
      description: string;
    }[];
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
    };
    wind: {
      speed: number;
    };
  }
  
  const Weather: React.FC = () => {
    const [city, setCity] = useState<string>('');
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const APIKEY = 'a6e0a02ebaab79e8c8b312d0730e0c5b';
    // useEffect(() => {
      const fetchWeather = async () => {
        try {
          const response = await axios.get<WeatherData>(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIKEY}`
          );
          console.log(response);
          
          setWeatherData(response.data);
          setError(null);
        } catch (error) {
          setError('City not found');
          console.error('Error fetching weather:', error);
        }
      };
    // }, [city]);
  
    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (city) {
        fetchWeather();
      }
    };
  
    return (
      <div>
        <h2>Weather Information</h2>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
          />
          <button type="submit">Search</button>
        </form>
        {error && <p>{error}</p>}
        {weatherData ? (
          <div>
            <h1>{city}</h1>
            <p>Main: {weatherData.weather[0].main}</p>
            <p>Description: {weatherData.weather[0].description}</p>
            <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
            <p>Feels Like: {weatherData.main.feels_like}K</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed}m/s</p>
          </div>
        ) : (
          <p>Enter a city to fetch weather information</p>
        )}
      </div>
    );
  };
  
  export default Weather;
  