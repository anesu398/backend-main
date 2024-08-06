// routes/areas.js

const express = require('express');
const router = express.Router();
const areaController = require('../controllers/areaController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Area:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - latitude
 *         - longitude
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the area
 *         name:
 *           type: string
 *           description: Name of the area
 *         description:
 *           type: string
 *           description: Description of the area
 *         latitude:
 *           type: number
 *           description: Latitude of the area
 *         longitude:
 *           type: number
 *           description: Longitude of the area
 *       example:
 *         id: d5fE_asz
 *         name: Centinary Park
 *         description: A large public park in Bulawayo
 *         latitude: 40.785091
 *         longitude: -73.968285
 */

/**
 * @swagger
 * tags:
 *   name: Areas
 *   description: API for managing areas
 */

/**
 * @swagger
 * /areas:
 *   post:
 *     summary: Add a new area
 *     tags: [Areas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Area'
 *     responses:
 *       201:
 *         description: Area added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Area'
 *       400:
 *         description: Invalid input or area already exists
 *       500:
 *         description: Internal server error
 */
router.post('/areas', areaController.addArea);

/**
 * @swagger
 * /areas:
 *   get:
 *     summary: Retrieve all areas
 *     tags: [Areas]
 *     responses:
 *       200:
 *         description: List of all areas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Area'
 *       500:
 *         description: Internal server error
 */
router.get('/areas', areaController.getAllAreas);

module.exports = router;
