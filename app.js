const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const axios = require('axios');
const NodeCache = require('node-cache');
const dotenv = require('dotenv');
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/weather-api');

const connect = mongoose.connection;
connect.on('open', function (error) {
    if(error){
        console.log("Not Connected to DB",error);
    }
    console.log("DB Connected Wooo-hoooo");
})


const cache = new NodeCache({ stdTTL:300 });
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 100
})
app.use(bodyParser.json());
app.use(limiter);


app.use('/locations', require('./routes/locationRoutes'));
app.use('/locations', require('./routes/weatherRoutes'));
app.use('/history', require('./routes/historyRoutes'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });