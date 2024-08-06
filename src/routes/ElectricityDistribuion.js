const express = require('express');
const router = express.Router();
const ElectricityDistribution = require('../models/ElectricityDistribution');
const swaggerJsdoc = require('swagger-jsdoc');

// Swagger configuration options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Electricity Distribution API',
      version: '1.0.0',
      description: 'API endpoints for electricity distribution',
    },
    servers: [
      {
        url: 'https://backend-nl4r.onrender.com/api/',
        url: 'http://localhost:8800/api/',// Change the URL as per your deployment
      },
    ],
  },
  apis: [__filename], // This file
};

// Initialize Swagger
const swaggerSpec = swaggerJsdoc(options);

/**
 * @swagger
 * /electricity/{suburb}:
 *   get:
 *     summary: Get electricity status for a specific suburb
 *     tags: [Electricity Distribution]
 *     parameters:
 *       - in: path
 *         name: suburb
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the suburb
 *     responses:
 *       200:
 *         description: Electricity status retrieved successfully
 *       404:
 *         description: Electricity status for the suburb not found
 */
router.get('/electricity/:suburb', async (req, res) => {
  try {
    const suburb = req.params.suburb;
    const status = await ElectricityDistribution.findOne({ suburb });
    if (!status) {
      return res.status(404).json({ error: 'Electricity status for the suburb not found' });
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
