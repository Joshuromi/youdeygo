import jwt from 'jsonwebtoken';

const secret = process.env.JWT_KEY;

const verifyToken = (req, res, next) => {
  const header = req.headers.Authorization || req.headers.authorization || req.query.Authorization;
  if (typeof header !== 'undefined') {
    try {
      // const token = header; // With React
      const token = header.split(' ')[1]; // Without React
      req.decoded = jwt.verify(token, secret);
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
  } else {
    return res.status(401).json({
      message: 'Token not provided'
    });
  }
};

export default verifyToken;
