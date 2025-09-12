import { useState, useCallback } from 'react';
import axios from 'axios';

const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async (city) => {
    if (!city) return;
    setLoading(true);
    setError(null);
    setWeather(null);
    try {
      // This calls your own backend, not OpenWeather directly
      const response = await axios.get(`/api/weather?city=${city}`);
      setWeather(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not fetch weather data.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { weather, loading, error, fetchWeather };
};

export default useWeather;