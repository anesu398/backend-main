const express = require('express');
const router = express.Router();
const ServiceRequest = require('../models/ServiceRequest');
const swaggerJsdoc = require('swagger-jsdoc');

// Swagger configuration options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Service Request API',
      version: '1.0.0',
      description: 'API endpoints for service requests',
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
 * /service/{requestId}:
 *   get:
 *     summary: Get service request by ID
 *     tags: [Service Request]
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the service request
 *     responses:
 *       200:
 *         description: Service request retrieved successfully
 *       404:
 *         description: Service request not found
 */
router.get('/service/:requestId', async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const request = await ServiceRequest.findOne({ requestId });
    if (!request) {
      return res.status(404).json({ error: 'Service request not found' });
    }
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to serve Swagger JSON
router.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

module.exports = router;
