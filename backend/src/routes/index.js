const express = require('express');
const user = require('../controllers/userController');
const ride = require('../controllers/rideController');
const  verifyToken = require('../middlewares/verifyToken');
const  {isUserValid, isUserAdmin }  = require('../middlewares/checkAuth') ;
const { validateSignup, validateSignin, validateEdit } = require('../middlewares/userCredentials');

const app = express.Router();  

app.get("/", (req, res) => res.send("Welcome to youDeyGo. A car pooling app")); 

// User Routes
app.get('/users',verifyToken, isUserAdmin, user.getAllUsers);
app.get('/users/:userId',verifyToken, isUserAdmin, user.getSingleUser);
app.post('/register', validateSignup, user.register);
app.post('/login', validateSignin, user.login);
app.put('/edit', verifyToken, isUserValid, validateEdit, user.editProfile);
app.put('/enable/:userId', verifyToken, isUserAdmin, user.enableUser);
app.put('/disable/:userId', verifyToken, isUserAdmin, user.disableUser);
app.delete('/delete/:userId', verifyToken, isUserAdmin, user.deleteUser);

// Ride Routes
app.post('/rides', verifyToken, isUserValid, ride.create); //validateRideInput

module.exports = app;
