const rideModel = require('../models/rideModel');

const  { validTime  } = require('./regEx') ;


const { carName, plateNumber, depature, destination, time, scheduleDate, seats, cost, message } = req.body