const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  const tokenPart = token.split(' ')[1]; // Extract the token part

  jwt.verify(tokenPart, process.env.SECRET_KEY || 'default_secret_key', (err, decoded) => {
    if (err) {
      console.error('Token verification failed:', err);
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }

    req.user = decoded;
    next();
  });
};
