const express = require('express');
const router = express.Router();
const Location = require('../models/Location');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 }); // Cache with a TTL of 5 minutes
const { fetchWeatherData } = require('../utils/weatherUtils');

// GET weather forecast for a location
router.get('/:location_id/weather', async (req, res) => {
  try {
    const locationId = req.params.location_id;
    // Fetch location details from database
    const location = await Location.findById(locationId);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    // Check if weather data is cached for this location
    const cachedWeatherData = cache.get(locationId);
    if (cachedWeatherData) {
      return res.json(cachedWeatherData);
    }

    // If not cached, fetch weather data from external API
    const weatherData = await fetchWeatherData(location.latitude, location.longitude);

    // Cache the weather data
    cache.set(locationId, weatherData);

    res.json(weatherData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
