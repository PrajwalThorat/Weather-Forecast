const express = require('express');
const router = express.Router();
const Location = require('../models/location');


router.get('/', async (req, res) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})


router.post('/', async (req, res) => {
    const location = new Location({
        name : req.body.name,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    });

    try {
        const newLocation = await location.save();
        res.status(201).json(newLocation);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
});

router.get('/:location_id', getLocation, (req, res) => {
    res.json(res.location);
})


router.put('/:location_id', getLocation, async (req, res) => {
    if (req.body.name != null) {
        res.location.name = req.body.name;
    }
    if(req.body.latitude != null){
        res.location.latitude = req.body.latitude;
    }
    if(req.body.longitude != null){
        res.location.longitude = req.body.longitude;
    }

    try {
        const updateLocation = await res.location.save();
        res.json(updateLocation);
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
});


router.delete('/:location_id', getLocation, async (req, res) => {
    try {
        await res.location.deleteOne();
        res.json({ message: "Deleted Location"});
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: err.message
        })
    }
})

async function getLocation(req, res, next) {
    let location;
    try {
        location = await Location.findById(req.params.location_id);
        if (location == null) {
            return res.status(400).json({ message: "Location Not Found "});
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
    res.location = location;
    next();
}

module.exports = router