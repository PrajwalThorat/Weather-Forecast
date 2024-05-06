const axios = require('axios');

// Function to fetch real-time weather data from external API
async function fetchWeatherData(latitude, longitude) {
  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}`);
    return response.data;
  } catch (err) {
    throw new Error('Failed to fetch weather data');
  }
}

// Function to fetch historical weather data from external API
async function fetchHistoricalWeatherData(days) {
  try {
    const endDate = new Date().toISOString().split('T')[0]; // End date is today
    const startDate = new Date(new Date().setDate(new Date().getDate() - days)).toISOString().split('T')[0]; // Start date is (days) days ago

    const response = await axios.get(`http://api.openweathermap.org/data/2.5/onecall/timemachine?lat={latitude}&lon={longitude}&start=${startDate}&end=${endDate}&appid=${process.env.WEATHER_API_KEY}`);
    
    return response.data;
  } catch (err) {
    throw new Error('Failed to fetch historical weather data');
  }
}

module.exports = { fetchWeatherData, fetchHistoricalWeatherData };
