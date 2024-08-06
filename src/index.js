const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const connectDB = require('./db');
const dotenv = require('dotenv');
const zetdcRoutes = require('./routes/zetdcRoutes');
const suburbRoutes = require('./routes/suburbRoutes');
const areasNearbyRoutes = require('./routes/areasNearbyRoutes');
const loadsheddingStatusRoutes = require('./routes/loadsheddingStatusRouter');
const areaStatusRoutes = require('./routes/areaStatusRoutes');
const userRoutes = require('./routes/userRoutes');
const faultRoutes = require('./routes/faultRoutes');
const { swaggerUi, specs } = require('./swagger');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const areaRoutes = require('./routes/areas');



dotenv.config();


const app = express();


connectDB();
mongoose.connect('mongodb+srv://ndabaprinco:0787008238@zesapush.bax9exp.mongodb.net/Zesa', { useNewUrlParser: true, useUnifiedTopology: true });


app.use(bodyParser.json());
app.use(areaStatusRoutes);
app.use(cors());

const secretKey = process.env.SECRET_KEY || '95e9c82b2525897a0a707fc3b1459f002bc1e171b45372dfa60cd24fbec0d8f8';

// Mock user data for authentication
const users = [
  {
    id: 1,
    username: 'user1',
    password: 'password123' // In a real application, passwords should be hashed
  }
];

// Authentication endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  
  const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

  console.log('Generated token:', token);

  res.json({ token });
});
const waterRoutes = require('./routes/WaterRoute');

app.use('/api/water', waterRoutes);
app.use('/api', zetdcRoutes, suburbRoutes, areasNearbyRoutes, loadsheddingStatusRoutes, faultRoutes, userRoutes, areaRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = { app };
