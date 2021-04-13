const rideModel = require("../models/rideModel");
const { validTime, validNumber } = require("./regEx");

class validations {
  /**
   * @description validate ride details
   * @function createRideValidations
   * @param {object} body
   * @returns {Array} createRideErrors
   */
  static async validateRideCreation(body, userId) {
    const {
      carName,
      plateNumber,
      depature,
      destination,
      time,
      scheduleDate,
      seats,
      price,
    } = body;
    const duplicateTime = await rideModel.findOne({
      time,
      userId,
      scheduleDate,
    });
    const createRideErrors = {};

    if (!carName) {
      createRideErrors.message = "Your car's name is required";
    }

    if (!plateNumber) {
      createRideErrors.message = "Your car's plate number is required";
    }

    if (!depature) {
      createRideErrors.message = "You need to set a depature";
    }

    if (!destination) {
      createRideErrors.message = "You need to set a destination";
    }

    if (!scheduleDate) {
      createRideErrors.message = "Schedule a date";
    }

    if (!seats || !validNumber.test(seats)) {
      createRideErrors.message = "Available seats must be valid numbers";
    }

    if (!price || !validNumber.test(price)) {
      createRideErrors.message = "Price is required and must be valid numbers";
    }

    if (!time || !validTime.test(time)) {
      createRideErrors.message =
        "Time is required in a valid format (E.g 7:00 am)";
    }

    if (duplicateTime !== null && duplicateTime.seats > 0) {
      createRideErrors.message =
        "You already have available ride at this same time";
    }

    return createRideErrors;
  }
}

module.exports = validations;
