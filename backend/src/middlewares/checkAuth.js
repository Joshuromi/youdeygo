import Model from '../models';

export const isUserValid = async ({ decoded: { userId } }, res, next) => {
  const userFound = await Model.user.findOne({
    where: { id: userId }
  });
  if (userFound) {
    return next();
  }
  return res.status(404).json({
    message: 'Login First'
  });
};

export const isUserAdmin = async ({ decoded: { userId } }, res, next) => {
  const userFound = await Model.user.findOne({
    where: { id: userId }
  });
  if (userFound.role === 1) {
    return next();
  }
  return res.status(401).json({
    message: 'Only Admin is allowed!'
  });
};
