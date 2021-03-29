const  validation = require('../helpers/requestValidations') ;

exports.validateCreateRequest = async (req, res, next) => {
    const userId = req.decoded.userId;
    const rideId = req.params.rideId;
  const errors = await validation.validateRequestCreation(req.body, rideId, userId);
  if (Object.keys(errors).length > 0) {
    return res.send(errors);
  }
  return next();
};
exports.checkRideOwner = async (req, res, next) => {
  const userId = req.decoded.userId;
  const requestId = req.params.rideId;
  const errors = await validation.getRideOwner(requestId, userId);
  if (Object.keys(errors).length > 0) {
    return res.send(errors);
  }
  return next();
}