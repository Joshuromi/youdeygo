const jwt = require('jsonwebtoken');

const secret = process.env.JWT_KEY;

 const createToken = (userData) => {
  const token = jwt.sign({
    userId: userData._id,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    role: (() => ((userData.role === 1) ? 'Admin' : 'User'))()
  }, secret, {
    expiresIn: '1h'
  });
  return token;
}; 
module.exports = createToken;