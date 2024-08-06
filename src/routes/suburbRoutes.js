// src/routes/suburbRoutes.js

const express = require('express');
const { getSuburbByCode, createSuburb, updateSuburb, deleteSuburb } = require('../controllers/suburbController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Suburb:
 *       type: object
 *       required:
 *         - code
 *         - name
 *       properties:
 *         code:
 *           type: string
 *           description: The unique code of the suburb
 *         name:
 *           type: string
 *           description: The name of the suburb
 *       example:
 *         code: "KML"
 *         name: "Khumalo"
 */

/**
 * @swagger
 * /suburbs/{code}:
 *   get:
 *     summary: Get a suburb by code
 *     tags: [Suburbs]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The suburb code
 *     responses:
 *       200:
 *         description: The suburb description by code
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Suburb'
 *       404:
 *         description: The suburb was not found
 *       500:
 *         description: Some error happened
 */
router.get('/suburbs/:code', getSuburbByCode);

/**
 * @swagger
 * /suburbs:
 *   post:
 *     summary: Create a new suburb
 *     tags: [Suburbs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Suburb'
 *     responses:
 *       201:
 *         description: Suburb created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Suburb'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Some error happened
 */
router.post('/suburbs', createSuburb);

/**
 * @swagger
 * /suburbs/{code}:
 *   put:
 *     summary: Update a suburb
 *     tags: [Suburbs]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The suburb code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Suburb'
 *     responses:
 *       200:
 *         description: Suburb updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Suburb'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Suburb not found
 *       500:
 *         description: Some error happened
 */
router.put('/suburbs/:code', updateSuburb);

/**
 * @swagger
 * /suburbs/{code}:
 *   delete:
 *     summary: Delete a suburb
 *     tags: [Suburbs]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The suburb code
 *     responses:
 *       204:
 *         description: Suburb deleted successfully
 *       404:
 *         description: Suburb not found
 *       500:
 *         description: Some error happened
 */
router.delete('/suburbs/:code', deleteSuburb);

module.exports = router;
