const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

const secretKey = 'your_secret_key';

// Authentication endpoint
app.post('/login', (req, res) => {
    // Authenticate user (e.g., verify username/password)

    // Example user data
    const user = {
        id: 1,
        username: 'user1'
    };

    // Generate JWT
    const token = jwt.sign(user, secretKey, { expiresIn: '1h' });

    res.json({ token });
});

// Authenticated endpoint
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Authenticated request' });
});

// Token verification middleware
function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
}

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
