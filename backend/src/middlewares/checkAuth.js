const userModel = require('../models/userModel');

const isUserValid = async ({ decoded: { userId } }, res, next) => {
  const userFound = await userModel.findById(userId);
  if (userFound) {
    return next();
  }
  return res.status(404).json({
    message: 'Login First'
  });
};

 const isUserAdmin = async ({ decoded: { userId } }, res, next) => {
  const userFound = await userModel.findById(userId);
  if (userFound.role === 1) {
    return next();
  }
  return res.status(401).json({
    message: 'Only Admin is allowed!'
  });
};

module.exports = { isUserValid, isUserAdmin }