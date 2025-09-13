import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

// It's good practice to install and use a nice icon library
// npm install react-icons
import { FaWind, FaTint, FaSearch } from 'react-icons/fa';
import { WiSunrise, WiSunset } from 'react-icons/wi';

const Weather = () => {
  const { user } = useSelector((state) => state.auth); // For the auth token
  
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city) {
      setError('Please enter a city name.');
      return;
    }
    setLoading(true);
    setError(null);
    setWeather(null); // Clear previous results

    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      // The frontend calls YOUR backend, not OpenWeather directly
      const { data } = await axios.get(`/api/weather?city=${city}`, config);
      setWeather(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not fetch weather data. Please check the city name.');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to convert UNIX timestamp to a readable time
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-800">Weather Dashboard</h1>

      {/* Search Form */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <form onSubmit={handleSearch} className="flex items-center space-x-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search for a city..."
            className="input-light flex-1"
          />
          <button
            type="submit"
            disabled={loading}
            className="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 disabled:bg-emerald-400 disabled:cursor-not-allowed"
          >
            <FaSearch className="mr-2" />
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {/* Display Area: Shows loading, error, or weather data */}
      <div className="mt-8">
        {error && <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{error}</div>}
        
        {weather && (
          <div className="bg-white p-8 rounded-xl shadow-lg animate-fade-in">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{weather.name}, {weather.sys.country}</h2>
                <p className="text-lg text-gray-500 capitalize">{weather.weather[0].description}</p>
              </div>
              <div className="text-right">
                 <img 
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                    alt="weather icon" 
                    className="-mt-4"
                  />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-5xl font-bold text-emerald-600">{Math.round(weather.main.temp)}°C</p>
                <p className="text-gray-600">Temperature</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-2xl font-semibold text-gray-800 flex items-center justify-center"><FaTint className="mr-2 text-blue-500"/> {weather.main.humidity}%</p>
                <p className="text-gray-600 mt-2">Humidity</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-2xl font-semibold text-gray-800 flex items-center justify-center"><FaWind className="mr-2 text-gray-500"/> {weather.wind.speed} m/s</p>
                <p className="text-gray-600 mt-2">Wind Speed</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex justify-around text-2xl font-semibold text-gray-800">
                    <span className="flex items-center"><WiSunrise className="text-yellow-500" size={36}/> {formatTime(weather.sys.sunrise)}</span>
                    <span className="flex items-center"><WiSunset className="text-orange-500" size={36}/> {formatTime(weather.sys.sunset)}</span>
                </div>
                <p className="text-gray-600 mt-2">Sunrise & Sunset</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default Weather;