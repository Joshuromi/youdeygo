const express = require('express'); 
const ride = require('../controllers/rideController');
const  verifyToken = require('../middlewares/verifyToken');
const  {isUserValid }  = require('../middlewares/checkAuth') ; 
const { validateCreateRide } = require('../middlewares/rideCredentials');

const router = express.Router();

router.get('/rides', ride.getAllRides);
router.get('/rides/:rideId', ride.getSingleRide);
router.get('/searchrides', ride.searchRides)
router.get('/myrides', verifyToken, isUserValid, ride.myRIdes);
router.get('/myrides/:rideId', verifyToken, isUserValid, ride.mySingleRIde);
router.post('/rides', verifyToken, isUserValid, validateCreateRide, ride.create);

module.exports = router;