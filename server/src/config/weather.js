const axios = require('axios');
require('dotenv').config();

// First, check if the environment variable is even set.
if (!process.env.OPENWEATHER_API_KEY) {
  // Use console.error for important warnings.
  console.error('\x1b[31m%s\x1b[0m', 'FATAL ERROR: OPENWEATHER_API_KEY is not defined in your .env file.');
  // Exit the process because the app cannot function without this key.
  process.exit(1);
}

// Create the reusable Axios instance for your application's API calls.
const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: process.env.OPENWEATHER_API_KEY,
    units: 'metric',
  },
});

/**
 * A utility function to check the connection to the OpenWeather API on server startup.
 * It makes a simple, lightweight request to verify the API key and connectivity.
 */
const checkWeatherAPIConnection = async () => {
  try {
    // We make a test call to a known, reliable location like London.
    // This will validate the API key and ensure the service is reachable.
    await weatherApi.get('/weather', {
      params: { q: 'London' }
    });

    // Log a success message in green for better visibility.
    console.log('\x1b[32m%s\x1b[0m', ' OpenWeather API connected successfully.');

  } catch (error) {
    // Log a failure message in red.
    console.error('\x1b[31m%s\x1b[0m', ' Error connecting to OpenWeather API:');

    // Provide helpful, specific feedback based on the error type.
    if (error.response) {
      if (error.response.status === 401) {
        console.error('\x1b[33m%s\x1b[0m', '-> Authentication failed. Your OPENWEATHER_API_KEY is likely invalid or expired. Please check your .env file.');
      } else {
        console.error(`-> Received an error response: ${error.response.status} - ${error.response.data.message}`);
      }
    } else if (error.request) {
      console.error('\x1b[33m%s\x1b[0m', '-> No response from the server. Please check your network connection and the API endpoint.');
    } else {
      console.error('-> An unexpected error occurred:', error.message);
    }
  }
};

// Export both the instance and the connection checker function.
module.exports = { weatherApi, checkWeatherAPIConnection };