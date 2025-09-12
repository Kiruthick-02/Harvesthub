const { weatherApi } = require('../config/weather'); // Your pre-configured axios instance

/**
 * @desc    Fetch weather for a given city
 * @route   GET /api/weather
 * @access  Private (for logged-in users)
 */
const getWeatherByCity = async (req, res, next) => {
  const { city } = req.query;

  if (!city) {
    res.status(400); // Bad Request
    return next(new Error('A city name is required.'));
  }

  try {
    const response = await weatherApi.get('/weather', {
      params: { q: city },
    });
    res.json(response.data);
  } catch (error) {
    // Pass the error to the error handling middleware
    const statusCode = error.response ? error.response.status : 500;
    const message = error.response?.data?.message || 'Failed to fetch weather data from the provider.';
    res.status(statusCode);
    next(new Error(message));
  }
};

module.exports = { getWeatherByCity };