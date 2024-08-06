// middleware/tokenValidationMiddleware.js

const jwt = require('jsonwebtoken');
const tokenDB = require('../tokenDB');

const secretKey = 'c660ddac8ec67108511a1d728046558a793d831a040fb8a091877e822ee123ae'; // Replace with your actual secret key

const tokenValidationMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized. Token is missing.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, secretKey);

    // Check if token exists in the database
    if (!tokenDB.has(token)) {
      return res.status(401).json({ error: 'Unauthorized. Token is invalid.' });
    }

    // Check if token has expired
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTimestamp) {
      return res.status(401).json({ error: 'Unauthorized. Token has expired.' });
    }

    // Token is valid
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized. Token is invalid.' });
  }
};

module.exports = tokenValidationMiddleware;
