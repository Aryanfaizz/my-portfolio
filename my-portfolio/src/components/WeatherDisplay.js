import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherDisplay({ setLoading, setError }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/.netlify/functions/api/weather');
        setWeather(response.data);
      } catch (err) {
        setError('Failed to fetch weather data.');
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [setLoading, setError]);

  return (
    <div className="weather-section mb-5">
      <h2>Weather in Halifax</h2>
      {weather ? (
        <div>
          <p><strong>City:</strong> {weather.city}, {weather.country}</p>
          <p><strong>Temperature:</strong> {weather.temperature.current}°C</p>
          <p><strong>Humidity:</strong> {weather.humidity}%</p>
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
}

export default WeatherDisplay;