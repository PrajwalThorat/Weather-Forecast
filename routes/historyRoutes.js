const express = require('express');
const router = express.Router();
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 }); // Cache with a TTL of 5 minutes
const { fetchHistoricalWeatherData } = require('../utils/weatherUtils');

// GET historical weather data
router.get('/history', async (req, res) => {
  try {
    const days = parseInt(req.query.days);
    if (isNaN(days)) {
      return res.status(400).json({ message: 'Invalid number of days' });
    }

    
    const cachedHistoricalData = cache.get(`history-${days}`);
    if (cachedHistoricalData) {
      return res.json(cachedHistoricalData);
    }


    const historicalData = await fetchHistoricalWeatherData(days);

    cache.set(`history-${days}`, historicalData);

    res.json(historicalData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
