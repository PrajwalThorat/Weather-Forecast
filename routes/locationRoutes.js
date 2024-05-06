const express = require('express');
const router = express.Router();
const Location = require('../models/Location');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 }); // Cache with a TTL of 5 minutes

// GET all locations
router.get('/', async (req, res) => {
  try {
    // Check if locations are cached
    const cachedLocations = cache.get('locations');
    if (cachedLocations) {
      return res.json(cachedLocations);
    }

    // If not cached, fetch locations from the database
    const locations = await Location.find();
    
    // Cache the locations
    cache.set('locations', locations);

    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new location
router.post('/', async (req, res) => {
  const location = new Location({
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  });

  try {
    const newLocation = await location.save();
    // Clear locations cache
    cache.del('locations');
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET a specific location by ID
router.get('/:location_id', getLocation, (req, res) => {
  res.json(res.location);
});

// PUT/update a specific location by ID
router.put('/:location_id', getLocation, async (req, res) => {
  if (req.body.name != null) {
    res.location.name = req.body.name;
  }
  if (req.body.latitude != null) {
    res.location.latitude = req.body.latitude;
  }
  if (req.body.longitude != null) {
    res.location.longitude = req.body.longitude;
  }
  try {
    const updatedLocation = await res.location.save();
    // Clear locations cache
    cache.del('locations');
    res.json(updatedLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a specific location by ID
router.delete('/:location_id', getLocation, async (req, res) => {
  try {
    await res.location.deleteOne();
    // Clear locations cache
    cache.del('locations');
    res.json({ message: 'Location deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getLocation(req, res, next) {
  let location;
  try {
    location = await Location.findById(req.params.location_id);
    if (location == null) {
      return res.status(404).json({ message: 'Location not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.location = location;
  next();
}

module.exports = router;
