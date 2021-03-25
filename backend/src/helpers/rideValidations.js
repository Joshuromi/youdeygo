const rideModel = require('../models/rideModel');
const  { validTime  } = require('./regEx') ; 


class validations {
    /**
     * @description validate ride details
     * @function createRideValidations
     * @param {object} body
     * @returns {Array} createRideErrors
     */
    static async validateRideCreation(body, userId) { 
     const { carName, plateNumber, depature, destination, time, scheduleDate, seats, cost, message } = body 
    const duplicateTime = await rideModel.findOne({time, userId})
    const createRideErrors = {}; 
    if (!time || !validTime.test(time)) {
        createRideErrors.message = 'Time is required in a valid format (E.g 7:00 am)';
      }
      if (duplicateTime !== null && duplicateTime.seats > 0 ) {
        createRideErrors.message = 'You already have an incomplete tide at this same time';
        }
    
      return createRideErrors;
    }

}

module.exports = validations;