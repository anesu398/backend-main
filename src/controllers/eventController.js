// controllers/eventController.js
const Event = require('../models/Event');

exports.addEvent = async (req, res) => {
    try {
        const { name, date, location, description } = req.body;

        // Validate input
        if (!name || !date || !location) {
            return res.status(400).json({ message: 'Name, date, and location are required' });
        }

        // Create a new event document
        const newEvent = new Event({
            name,
            date,
            location,
            description
        });

        // Save to database
        await newEvent.save();

        res.json({ message: 'Event added successfully', event: newEvent });
    } catch (error) {
        console.error('Error adding event:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
