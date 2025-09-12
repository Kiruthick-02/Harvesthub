import React, { useState } from 'react';
import useWeather from './useWeather';

const WeatherWidget = () => {
  const [city, setCity] = useState('New York');
  const { weather, loading, error, fetchWeather } = useWeather();

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };
  
  // Fetch weather for default city on initial render
  useState(() => {
    fetchWeather(city);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Weather Forecast</h3>
      <form onSubmit={handleSearch} className="flex space-x-2 mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="input-style flex-1"
        />
        <button type="submit" className="form-button px-4" disabled={loading}>
          {loading ? '...' : 'Search'}
        </button>
      </form>

      {error && <p className="text-red-500 text-center">{error}</p>}
      
      {weather && (
        <div className="text-center bg-gradient-to-br from-emerald-400 to-green-600 text-white p-6 rounded-lg">
            <h4 className="text-3xl font-bold">{weather.name}</h4>
            <div className="flex items-center justify-center my-2">
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
                <p className="text-5xl font-bold">{Math.round(weather.main.temp)}°C</p>
            </div>
            <p className="text-xl capitalize">{weather.weather[0].description}</p>
            <p className="text-sm mt-2">Feels like: {Math.round(weather.main.feels_like)}°C</p>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;