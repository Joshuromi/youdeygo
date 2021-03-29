const  validation = require('../helpers/requestValidations') ;

exports.validateCreateRequest = async (req, res, next) => {
    const userId = req.decoded.userId;
    const rideId = req.params.rideId;
  const errors = await validation.validateRideCreation(req.body, rideId, userId);
  if (Object.keys(errors).length > 0) {
    return res.send(errors);
  }
  return next();
};
