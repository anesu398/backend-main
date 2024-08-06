const express = require('express');
const router = express.Router();
const areaStatusController = require('../controllers/areaStatusController');

/**
 * @swagger
 * /area-status/{suburb}:
 *   get:
 *     summary: Get load shedding status for a specific suburb or even partial
 *     tags: [Area Status, Loadshedding]
 *     parameters:
 *       - in: path
 *         name: suburb
 *         required: true
 *         schema:
 *           type: string
 *         description: Suburb name or partial name
 *     responses:
 *       200:
 *         description: Load shedding status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       suburb:
 *                         type: string
 *                       status:
 *                         type: string
 *                       stage:
 *                         type: string
 *                       startTime:
 *                         type: string
 *                         format: date-time
 *                       endTime:
 *                         type: string
 *                         format: date-time
 *       400:
 *         description: Suburb parameter is required
 *       404:
 *         description: No status found for suburb
 *       500:
 *         description: Failed to fetch load shedding status
 */
router.get('/area-status/:suburb', areaStatusController.getAreaStatus);


module.exports = router;
