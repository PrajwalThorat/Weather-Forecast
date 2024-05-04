const express = require('express');
const router = express.Router();
const axios = require('axios');
const { fetchHistoricalWeatherData } = require('../utils/weatherUtils');


router.get('/history' , async (req, res) =>{
    try {
        const days = parseInt(req.query.days);
        if (isNaN(days)) {
            return res.status(400).json({ message: "Invalid Number of Days " });
        }

        const historicalData  = await fetchHistoricalWeatherData(days);
        res.json(historicalData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;