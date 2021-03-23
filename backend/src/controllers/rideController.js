const userModel = require('../model/userModel');
const rideModel = require('../model/rideModel');


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

    const { carName, plateNumber, depature, destination, time, seats, cost, message } = req.body

    const newRide = new rideModel({ userId, driverName, driverPhone, carName, plateNumber, driverPhone, depature,
      destination, time, seats, cost, message, createdAt: today, updatedAt: today});

    const ride = await newRide.save();
    return res.status(200).json({
      message: 'Ride created successfully!',
        ride
    });
  }
}

module.exports = ride;
