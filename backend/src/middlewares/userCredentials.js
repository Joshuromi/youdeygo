const validation = require("../helpers/userValidations");

exports.validateSignup = async (req, res, next) => {
  const errors = await validation.signupValidations(req.body);
  if (Object.keys(errors).length > 0) {
    return res.send(errors);
  }
  return next();
};

exports.validateSignin = async (req, res, next) => {
  const errors = await validation.signinValidations(req.body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      errors,
    });
  }
  return next();
};

exports.validateEdit = async (req, res, next) => {
  const userId = req.decoded.userId;
  const errors = await validation.editValidations(req.body, userId);
  if (Object.keys(errors).length > 0) {
    return res.status(401).json({
      errors,
    });
  }
  return next();
};
