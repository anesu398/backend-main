const express = require('express');
const router = express.Router();
const faultController = require('../controllers/faultController');

/**
 * @swagger
 * /faults:
 *   post:
 *     summary: Report a new electrical fault
 *     tags: [Faults]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - suburb
 *               - description
 *             properties:
 *               userId:
 *                 type: string
 *               suburb:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Fault reported successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/faults', faultController.reportFault);

/**
 * @swagger
 * /faults/{suburb}:
 *   get:
 *     summary: Get all faults for a specific suburb
 *     tags: [Faults]
 *     parameters:
 *       - in: path
 *         name: suburb
 *         required: true
 *         schema:
 *           type: string
 *         description: Suburb name
 *     responses:
 *       200:
 *         description: List of faults
 *       400:
 *         description: Suburb parameter is required
 *       404:
 *         description: No faults found for the suburb
 *       500:
 *         description: Server error
 */
router.get('/faults/:suburb', faultController.getFaultsBySuburb);

module.exports = router;
