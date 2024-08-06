const express = require('express');
const router = express.Router();
const WaterDistribution = require('../models/WaterDistribution');
const swaggerJsdoc = require('swagger-jsdoc');

// Swagger configuration options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Water Distribution API',
      version: '1.0.0',
      description: 'API endpoints for water distribution',
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
 * /water/{area}:
 *   get:
 *     summary: Get water status for a specific area
 *     tags: [Water Distribution]
 *     parameters:
 *       - in: path
 *         name: area
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the area
 *     responses:
 *       200:
 *         description: Water status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WaterStatus'
 *       404:
 *         description: Water status for the area not found
 */
router.get('/water/:area', async (req, res) => {
  try {
    const area = req.params.area;
    const status = await WaterDistribution.findOne({ area });
    if (!status) {
      return res.status(404).json({ error: 'Water status for the area not found' });
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
