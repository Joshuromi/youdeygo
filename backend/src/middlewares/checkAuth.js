const userModel = require('../models/userModel');

const isUserValid = async ({ decoded: { userId } }, res, next) => {
  const userFound = await userModel.findById(userId);
  if (userFound) {
    return next();
  }
  return res.send('Login First');
};

 const isUserAdmin = async ({ decoded: { userId } }, res, next) => {
  const userFound = await userModel.findById(userId);
  if (userFound.role === 1) {
    return next();
  }
  return res.send('Only Admin is allowed!');
};

module.exports = { isUserValid, isUserAdmin }