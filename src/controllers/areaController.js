// controllers/areaController.js
const Area = require('../models/Area');

exports.addArea = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Validate input
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        // Create a new area document
        const newArea = new Area({
            name,
            description
        });

        // Save to database
        await newArea.save();

        res.json({ message: 'Area added successfully', area: newArea });
    } catch (error) {
        console.error('Error adding area:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to fetch all areas
exports.getAllAreas = async (req, res) => {
    try {
        // Retrieve all area documents from the database
        const areas = await Area.find();

        // Return the list of areas in the response
        res.status(200).json({ message: 'Areas retrieved successfully', data: areas });
    } catch (error) {
        console.error('Error retrieving areas:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
