const express = require('express');
const router = express.Router();
const areasNearbyController = require('../controllers/areasNearbyController');

/**
 * @swagger
 * /areas-nearby:
 *   get:
 *     summary: Get nearby areas
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         schema:
 *           type: number
 *         description: Latitude coordinate
 *       - in: query
 *         name: lon
 *         required: true
 *         schema:
 *           type: number
 *         description: Longitude coordinate
 *       - in: query
 *         name: radius
 *         required: false
 *         schema:
 *           type: number
 *           default: 10
 *         description: Search radius in miles (optional, default is 10 miles)
 *     responses:
 *       200:
 *         description: A list of nearby areas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nearbyAreas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       suburb:
 *                         type: string
 *                       coordinates:
 *                         type: array
 *                         items:
 *                           type: number
 *       400:
 *         description: Bad request, missing or invalid latitude or longitude
 *       500:
 *         description: Internal server error
 */
router.get('/areas-nearby', areasNearbyController.getAreasNearby);

module.exports = router;
