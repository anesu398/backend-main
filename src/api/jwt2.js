const jwt = require('jsonwebtoken');

// Secret key used to sign the JWT
const secretKey = 'your_secret_key';

// Function to generate a JWT token
const generateToken = (payload) => {
  // Generate token with payload and secret key
  return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
};

// Example payload for the token
const payload = {
  userId: '123456',
  username: 'anesundava'
};

// Generate a token using the payload
const token = generateToken(payload);
console.log('Generated Token:', token);
