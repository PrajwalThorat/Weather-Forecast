const axios = require('axios');
const API_KEY = process.env.WEATHER_API_KEY || '4da32931a7f228ff9172e960e9c26750';


async function fetchWeatherData(lat , long) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`);
        return response.data;
    } catch (err) {
        console.log(err);
        throw new Error('Failed to fetch weather Data');
    }
}


async function fetchHistoricalWeatherData(days) {
    
}


module.exports = { 
    fetchWeatherData, 
    fetchHistoricalWeatherData 
};