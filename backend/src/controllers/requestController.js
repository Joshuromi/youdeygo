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
        const availableSeats = rideFound.seats - parseInt(seats); // Reduce available ride seats wrt requestes seat(s) 
        const cost = price * parseInt(seats); // Calculate the amount passenger pays wrt requested seat(s)
        const driverId = rideFound.userId; // Get id of the driver that created the ride offer.
        
        const newRequest = new requestModel({ userId, rideId, driverId, driverName, passengerName, passengerPhone, carName, plateNumber, driverPhone, depature, destination, description, time, scheduleDate, seats, price, cost, message, status, createdAt: today, updatedAt: today});

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
  
  /**
   * @description Accept  request
   * @method PUT
   * @param {*} req
   * @param {*} res
   */
  static async acceptRequest(req, res) { 
    const requestId = req.params.requestId; // Get requestId passed in 
    const requestFound = await requestModel.findById(requestId);
    if (requestFound) {
      requestFound.set({ status: 'Accepted' });
      requestFound.save();
      return res.send('Request Accepted, meet your passenger soon!')
    }
   return res.send('Request not found');
  }
  
  /**
   * @description Decline  request
   * @method PUT
   * @param {*} req
   * @param {*} res
   */
  static async declineRequest(req, res) { 
    const requestId = req.params.requestId; // Get requestId passed in 
    const requestFound = await requestModel.findById(requestId);
    if (requestFound) {  
      const retrieveRide = await rideModel.findOne({_id: requestFound.rideId});
      const availableSeats = requestFound.seats + retrieveRide.seats;
      retrieveRide.set({seats: availableSeats}); 
      requestFound.set({ status: 'Declined' });
      requestFound.save();
      retrieveRide.save()
     return res.send('Request Declined!')
    }
   return res.send('Request not found');
  }
} 
module.exports = request;