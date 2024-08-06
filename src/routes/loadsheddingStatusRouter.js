const express = require('express');
const router = express.Router();
const loadsheddingStatusController = require('../controllers/loadsheddingController');

/**
 * @swagger
 * /loadshedding-status:
 *   post:
 *     summary: Create a new loadshedding status
 *     tags: [Loadshedding Status]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - suburb
 *               - status
 *               - stage
 *               - startTime
 *               - endTime
 *             properties:
 *               suburb:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Scheduled, Unscheduled]
 *               stage:
 *                 type: string
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               endTime:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Loadshedding status created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Failed to create loadshedding status
 */
router.post('/loadshedding-status-update', loadsheddingStatusController.createLoadsheddingStatus);

/**
 * @swagger
 * /loadshedding-status:
 *   get:
 *     summary: Get all loadshedding statuses
 *     tags: [Loadshedding Status]
 *     responses:
 *       200:
 *         description: Loadshedding statuses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   suburb:
 *                     type: string
 *                   status:
 *                     type: string
 *                   stage:
 *                     type: string
 *                   startTime:
 *                     type: string
 *                     format: date-time
 *                   endTime:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Failed to fetch loadshedding statuses
 */
router.get('/loadshedding-status', loadsheddingStatusController.getAllLoadsheddingStatuses);

/**
 * @swagger
 * /loadshedding-status/{id}:
 *   get:
 *     summary: Get loadshedding status by ID
 *     tags: [Loadshedding Status]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Loadshedding status ID
 *     responses:
 *       200:
 *         description: Loadshedding status retrieved successfully
 *       404:
 *         description: Loadshedding status not found
 *       500:
 *         description: Failed to fetch loadshedding status
 */
router.get('/loadshedding-status/:id', loadsheddingStatusController.getLoadsheddingStatusById);

/**
 * @swagger
 * /loadshedding-status/{id}:
 *   put:
 *     summary: Update loadshedding status by ID
 *     tags: [Loadshedding Status]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Loadshedding status ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - suburb
 *               - status
 *               - stage
 *               - startTime
 *               - endTime
 *             properties:
 *               suburb:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Scheduled, Unscheduled]
 *               stage:
 *                 type: string
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               endTime:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Loadshedding status updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Loadshedding status not found
 *       500:
 *         description: Failed to update loadshedding status
 */
router.put('/loadshedding-status/:id', loadsheddingStatusController.updateLoadsheddingStatusById);

/**
 * @swagger
 * /loadshedding-status/{id}:
 *   delete:
 *     summary: Delete loadshedding status by ID
 *     tags: [Loadshedding Status]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Loadshedding status ID
 *     responses:
 *       200:
 *         description: Loadshedding status deleted successfully
 *       404:
 *         description: Loadshedding status not found
 *       500:
 *         description: Failed to delete loadshedding status
 */
router.delete('/loadshedding-status/:id', loadsheddingStatusController.deleteLoadsheddingStatusById);

module.exports = router;
