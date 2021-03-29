const userModel = require('../models/userModel');
const rideModel = require('../models/rideModel');
const requestModel = require('../models/requestModel')


const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const today = new Date().toLocaleDateString('en-US', options);

class request {
  /**
   * @description Create  request
   * @method POST
   * @param {*} req
   * @param {*} res
   */
  static async create(req, res) { 
    const userId = req.decoded.userId; // Get loggedIn userId
    const rideId = req.params.rideId; // Get rideId passed in 

    const userFound = await userModel.findById(userId); // Fetch loggedIn user
    const rideFound = await rideModel.findById(rideId); // Fetch selected ride

    const passengerName = `${userFound.firstName} ${userFound.lastName}`;

    const passengerPhone = userFound.phoneNumber;
    const status = 'Pending';
    if (rideFound) {
        const { seats, message } = req.body;  
        const { carName, plateNumber, driverPhone, driverName, depature, destination, time, scheduleDate, price, description } = rideFound;
        const availableSeats = rideFound.seats - seats; // Reduce available ride seats wrt requestes seat(s) 
        const cost = rideFound.price * seats; // Calculate the amount passenger pays wrt requested seat(s)

        const newRequest = new requestModel({ userId, rideId, driverName, passengerName, passengerPhone, carName, plateNumber, driverPhone, depature, destination, description, time, scheduleDate, seats, price, cost, message, status, createdAt: today, updatedAt: today});

        const request = await newRequest.save();
        if (request) { 
          await rideFound.set({ seats: availableSeats });
          rideFound.save();
          return res.send( { 
            message: 'You\'ve successfully requested for this ride offer',
            request
            } );
        }
    }
    return res.send('Ride not found');

  } 
}

module.exports = request;