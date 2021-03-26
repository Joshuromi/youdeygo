const rideModel = require('../models/rideModel');
const  { validNumber } = require('./regEx') ; 
const getRide = (rideId) =>  rideModel.findOne({ rideId })


class validations {
    /**
     * @description validate ride details
     * @function createRideValidations
     * @param {object} body
     * @returns {Array} createRequestErrors
     */
    static async validateRideCreation(body, rideId, userId) { 
     const { seats } = body 
    const createRequestErrors = {};
    const selectedRide = await getRide(rideId);

    if (!seats || !validNumber.test(seats)) {
        createRequestErrors.message = 'Available seats must be valid numbers';
    }  
    if (selectedRide !== null && selectedRide.seats < seats ) {
    createRequestErrors.message = 'You already have an incomplete tide at this same time';
    }
    if (userId === selectedRide.userId) {
        createRequestErrors.message = 'You can\'t request for the ride you created!';
    }
    
      return createRequestErrors;
    }

}

module.exports = validations;