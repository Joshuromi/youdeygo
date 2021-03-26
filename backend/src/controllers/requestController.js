const userModel = require('../models/userModel');
const rideModel = require('../models/rideModel');
const requestModel = require('../models/requestModel')


const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const today = new Date().toLocaleDateString('en-US', options);

class ride {
  /**
   * @description Create  ride
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
    const { carName, plateNumber, depature, destination, time, scheduleDate, cost, description } = rideFound
    const status = 'Pending';
    if (rideFound) {
        const { seats, message } = req.body;  
        const newRequest = new requestModel({ userId, rideId, passengerName, passengerPhone, carName, plateNumber, driverPhone, depature, destination, description, time, scheduleDate, seats, cost, message, status, createdAt: today, updatedAt: today});

        const request = await newRequest.save();
        return res.send( { 
          message: 'You\'ve successfully requested for this ride offder',
           request
          } );
    }
    return res.send('Ride not found');

  } 
}

module.exports = ride;


