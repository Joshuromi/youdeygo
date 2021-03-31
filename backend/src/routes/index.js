const express = require('express');
const user = require('../controllers/userController');
const ride = require('../controllers/rideController');
const request = require('../controllers/requestController')
const  verifyToken = require('../middlewares/verifyToken');
const  {isUserValid, isUserAdmin }  = require('../middlewares/checkAuth') ;
const { validateSignup, validateSignin, validateEdit } = require('../middlewares/userCredentials');
const { validateCreateRide } = require('../middlewares/rideCredentials');
const { validateCreateRequest, checkRideOwner } = require('../middlewares/requestCredentials');

const app = express.Router();  

app.get("/", (req, res) => res.send("Welcome to youDeyGo. A car pooling app ...🚗")); 

// User Routes
app.get('/users',verifyToken, isUserAdmin, user.getAllUsers);
app.get('/users/:userId',verifyToken, isUserAdmin, user.getSingleUser);
app.post('/register', validateSignup, user.register);
app.post('/login', validateSignin, user.login);
app.put('/edit', verifyToken, isUserValid, validateEdit, user.editProfile);
app.patch('/profilePicture', verifyToken, isUserValid, user.uploadProfilePicture);
app.patch('/enable/:userId', verifyToken, isUserAdmin, user.enableUser);
app.patch('/disable/:userId', verifyToken, isUserAdmin, user.disableUser);
app.delete('/delete/:userId', verifyToken, isUserAdmin, user.deleteUser);

// Ride Routes
app.get('/rides', ride.getAllRides);
app.get('/rides/:rideId', ride.getSingleRide);
app.get('/searchrides', ride.searchRides)
app.get('/myrides', verifyToken, isUserValid, ride.myRIdes);
app.get('/myrides/:rideId', verifyToken, isUserValid, ride.mySingleRIde);
app.post('/rides', verifyToken, isUserValid, validateCreateRide, ride.create);

// Request Routes
app.post('/requests/:rideId', verifyToken, isUserValid, validateCreateRequest, request.create);
app.patch('/accept/:requestId', verifyToken, isUserValid, checkRideOwner, request.acceptRequest );
app.patch('/decline/:requestId', verifyToken, isUserValid, checkRideOwner, request.declineRequest);

module.exports = app;
