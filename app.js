const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const NodeCache = require('node-cache');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a cache instance with a TTL (time to live) of 5 minutes
const cache = new NodeCache({ stdTTL: 300 });

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100 // 100 requests per hour
});

// Logging middleware
app.use(morgan('dev'));

// Middleware
app.use(bodyParser.json());
app.use(limiter);

// Routes
app.use('/locations', require('./routes/locationRoutes'));
app.use('/locations', require('./routes/weatherRoutes'));
app.use('/history', require('./routes/historyRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
