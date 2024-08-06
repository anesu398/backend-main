const express = require('express');
const router = express.Router();
const GasDistribution = require('../models/GasDistribution');
const swaggerJsdoc = require('swagger-jsdoc');

// Swagger configuration options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Gas Distribution API',
      version: '1.0.0',
      description: 'API endpoints for gas distribution',
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
 * /gas/{region}:
 *   get:
 *     summary: Get gas status for a specific region
 *     tags: [Gas Distribution]
 *     parameters:
 *       - in: path
 *         name: region
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the region
 *     responses:
 *       200:
 *         description: Gas status retrieved successfully
 *       404:
 *         description: Gas status for the region not found
 */
router.get('/gas/:region', async (req, res) => {
  try {
    const region = req.params.region;
    const status = await GasDistribution.findOne({ region });
    if (!status) {
      return res.status(404).json({ error: 'Gas status for the region not found' });
    }
    res.json(status);
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
