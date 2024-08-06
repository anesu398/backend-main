const express = require('express');
const router = express.Router();
const waterController = require('../controllers/waterController');
const swaggerJsdoc = require('swagger-jsdoc');

// Swagger configuration options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Water API',
      version: '1.0.0',
      description: 'API endpoints for water service',
    },
    servers: [
      {
        url: 'https://backend-nl4r.onrender.com/api/',
        url: 'http://localhost:8800/api/', // Change the URL as per your deployment
      },
    ],
  },
  apis: [__filename], // This file
};

// Initialize Swagger
const swaggerSpec = swaggerJsdoc(options);

/**
 * @swagger
 * /status/{suburb}:
 *   get:
 *     summary: Get water status for a specific suburb
 *     tags: [Water]
 *     parameters:
 *       - in: path
 *         name: suburb
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the suburb
 *     responses:
 *       200:
 *         description: Water status retrieved successfully
 *       404:
 *         description: Water status for the suburb not found
 */
router.get('/status/:suburb', waterController.getWaterStatus);

/**
 * @swagger
 * /usage/{userId}:
 *   get:
 *     summary: Get water usage for a specific user
 *     tags: [Water]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Water usage retrieved successfully
 *       404:
 *         description: Water usage for the user not found
 */
router.get('/usage/:userId', waterController.getWaterUsage);

/**
 * @swagger
 * /report-leak:
 *   post:
 *     summary: Report a water leak
 *     tags: [Water]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LeakReport'
 *     responses:
 *       200:
 *         description: Leak reported successfully
 *       400:
 *         description: Bad request
 */
router.post('/report-leak', waterController.reportLeak);

/**
 * @swagger
 * /billing-info/{userId}:
 *   get:
 *     summary: Get billing information for a specific user
 *     tags: [Water]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Billing information retrieved successfully
 *       404:
 *         description: Billing information for the user not found
 */
router.get('/billing-info/:userId', waterController.getBillingInfo);

/**
 * @swagger
 * /request-service:
 *   post:
 *     summary: Request water service
 *     tags: [Water]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServiceRequest'
 *     responses:
 *       200:
 *         description: Service requested successfully
 *       400:
 *         description: Bad request
 */
router.post('/request-service', waterController.requestService);

// Endpoint to serve Swagger JSON
router.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

module.exports = router;
