const rideModel = require('../models/rideModel');
const requestModel = require('../models/requestModel');
const  { validNumber } = require('./regEx') ; 
const getRide = (rideId) =>  rideModel.findOne({ _id: rideId })


class validations {
    /**
     * @description validate ride details
     * @function createRideValidations
     * @param {object} body
     * @returns {Array} createRequestErrors
     */
    static async validateRequestCreation(body, rideId, userId) { 
     const { seats } = body 
    const createRequestErrors = {};
    const selectedRide = await getRide(rideId);

    if (!seats ||seats == 0 || !validNumber.test(seats)) {
        createRequestErrors.message = 'Available seat is required and must be valid numbers';
    }  
    if (selectedRide !== null && selectedRide.seats < seats ) {
    createRequestErrors.message = 'Your request is more than available seats';
    }
    if (selectedRide !== null && selectedRide.userId == userId ) {
        createRequestErrors.message = 'You can\'t request for the ride you created!';
    }
    
      return createRequestErrors;
    }
      /**
     * @description validate ride details
     * @function getRideOwner
     * @param {object} id
     * @returns {Array} getRideOwnertErrors
     */
       static async getRideOwner(requestId, userId) {  
        const selectRequest = await requestModel.findById(requestId)
       const getRideOwnertErrors = {}; 
       if (selectRequest !== null && selectRequest.driverId !== userId) {
        getRideOwnertErrors.message = 'Sorry!, this request is not for a ride you offered';
       }   
         return getRideOwnertErrors;
       }

}

module.exports = validations;