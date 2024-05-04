const express = require('express');
const router = express.Router();
const axios = require('axios');
const Location = require('../models/location');
const { fetchWeatherData } = require('../utils/weatherUtils');


router.get('/:location_id/weather', async (req , res) => {
    try{
        const locationId = req.params.location_id;
        const location = await Location.findById(locationId);
        if(!location){
            return res.status(404).json({ message: "Location Not Found "});
        }

        const weatherData = await fetchWeatherData(location.latitude, location.longitude);
        res.json(weatherData);
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;