const userModel = require('../models/userModel');
const rideModel = require('../models/rideModel');


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
    const userFound = await userModel.findById(userId); // Fetch loggedIn user
    const driverName = `${userFound.firstName} ${userFound.lastName}`;
    const driverPhone = userFound.phoneNumber;

    const { carName, plateNumber, depature, destination, time, scheduleDate, seats, cost, message } = req.body

    const newRide = new rideModel({ userId, driverName, driverPhone, carName, plateNumber, driverPhone, depature,
      destination, time, scheduleDate, seats, cost, message, createdAt: today, updatedAt: today});

    const ride = await newRide.save();
    return res.send({
      message: 'Ride created successfully!',
        ride
    });
  }

  /**
   * @description fetch all rides from database
   * @method GET
   * @param {*} req
   * @param {*} res
   */
  static async getAllRides(req, res) {
    const allRides = await rideModel.find();
    if (allRides.length > 0) {
      return res.send(allRides);
    }
    return res.send('No rides created yet!');
  }
  
}

module.exports = ride;
