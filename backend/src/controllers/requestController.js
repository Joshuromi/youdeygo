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
    const { carName, plateNumber, depature, destination, time, scheduleDate, cost, message } = rideFound

    if (rideFound) {
        const { seats, message } = req.body;  
        const newRequest = new requestModel({ userId, rideId, passengerName, passengerPhone, carName, plateNumber, driverPhone, depature, destination, time, scheduleDate, seats, cost, message, createdAt: today, updatedAt: today});

        const ride = await newRequest.save();
        return res.send( ride );
    }
    return res.send('Ride not found');

  }

  static async createComment(req, res) {
    const postId = parseInt(req.params.postId);
    const date = new Date().toDateString();
    const postFound = await Post.findOne({
      where: { id: postId }
    });
    if (postFound) {
      const { visitorName, visitorEmail, content } = req.body;
      await Comment.create({
        postId, visitorName, visitorEmail, content, date
      });
      return res.send('Comment appended successfully!');
    }
    return res.send('Post not found, comment not appended');
  }
}

module.exports = ride;


