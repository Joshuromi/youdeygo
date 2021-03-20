const jwt = require('jsonwebtoken');

const secret = process.env.JWT_KEY;

 const createToken = (userData) => {
  const token = jwt.sign({
    userId: userData.id,
    firstName: userData.fullName,
    email: userData.email,
    role: (() => ((userData.role === 1) ? 'Admin' : 'User'))()
  }, secret, {
    expiresIn: '1h'
  });
  return token;
}; 
module.exports = createToken;