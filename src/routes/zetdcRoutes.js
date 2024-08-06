const express = require('express');
const router = express.Router();

// Import controllers
const loadsheddingController = require('../controllers/loadsheddingController');
const areaStatusController = require('../controllers/areaStatusController');
const upcomingEventsController = require('../controllers/upcomingEventsController');
const searchAreaController = require('../controllers/searchAreaController');
const areasNearbyController = require('../controllers/areasNearbyController');
const userTopicsController = require('../controllers/userTopicsController');
const eventController = require('../controllers/eventController');
const areaController = require('../controllers/areaController');
const jwt = require('jsonwebtoken');

/**
 * @swagger
 * /area-status/{areaName}:
 *   get:
 *     summary: Get status of a specific area
 *     parameters:
 *       - in: path
 *         name: areaName
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the area to get the status for
 *     responses:
 *       200:
 *         description: Status of the area
 *       404:
 *         description: No status found for the area
 *       500:
 *         description: Internal server error
 */
router.get('/area-status/:areaName', areaStatusController.getAreaStatus);

/**
 * @swagger
 * /upcoming-events:
 *   get:
 *     summary: Get upcoming events
 *     responses:
 *       200:
 *         description: List of upcoming events
 *       500:
 *         description: Internal server error
 */
router.get('/upcoming-events', upcomingEventsController.getUpcomingEvents);

/**
 * @swagger
 * /search-area:
 *   get:
 *     summary: Search for an area
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Search query for the area
 *     responses:
 *       200:
 *         description: Search results for the area
 *       500:
 *         description: Internal server error
 */
router.get('/search-area', searchAreaController.searchArea);

/**
 * @swagger
 * /areas-nearby:
 *   get:
 *     summary: Get areas nearby
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         schema:
 *           type: number
 *         description: Latitude of the location
 *       - in: query
 *         name: lon
 *         required: true
 *         schema:
 *           type: number
 *         description: Longitude of the location
 *     responses:
 *       200:
 *         description: List of nearby areas
 *       400:
 *         description: Latitude and longitude are required
 *       500:
 *         description: Internal server error
 */
router.get('/areas-nearby', areasNearbyController.getAreasNearby);

/**
 * @swagger
 * /user-generated-topics:
 *   post:
 *     summary: Post user-generated topics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               topic:
 *                 type: string
 *                 description: The user-generated topic
 *     responses:
 *       201:
 *         description: Topic created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/user-generated-topics', userTopicsController.postUserGeneratedTopics);

/**
 * @swagger
 * /add-event:
 *   post:
 *     summary: Add a new event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the event
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date of the event
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/add-event', eventController.addEvent);

/**
 * @swagger
 * /add-area:
 *   post:
 *     summary: Add a new area
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the area
 *               code:
 *                 type: string
 *                 description: The code of the area
 *     responses:
 *       201:
 *         description: Area created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/add-area', areaController.addArea);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Mock user data for authentication
  const users = [
    {
      id: 1,
      username: 'user1',
      password: 'password123'
    }
  ];

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_KEY || 'default_secret_key', { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;
