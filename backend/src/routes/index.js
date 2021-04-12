const express = require('express'); 
const userRoutes = require('./userRoutes');
const rideRoutes = require('./rideRoutes');
const requestRoutes = require('./requestRoutes');
const router = express.Router();  

router.get("/", (req, res) => res.send("Welcome to youDeyGo. A car pooling router ...🚗")); 

// User Routes
router.use(userRoutes)

// Ride Routes
router.use(rideRoutes);

// Request Routes
router.use(requestRoutes);

module.exports = router;
