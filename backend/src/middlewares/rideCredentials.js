const  validation = require('../helpers/rideValidations') ;

exports.validateCreateRide = async (req, res, next) => {
    const userId = (req.decoded.userId);
  const errors = await validation.validateRideCreation(req.body, userId);
  if (Object.keys(errors).length > 0) {
    return res.send(errors);
  }
  return next();
};
