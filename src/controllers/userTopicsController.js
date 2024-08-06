// controllers/userTopicsController.js

const UserTopic = require('../models/UserTopic');

exports.postUserGeneratedTopics = async (req, res) => {
    try {
        const { latitude, longitude, topic } = req.body;

        // Validate input
        if (typeof latitude !== 'number' || typeof longitude !== 'number' || typeof topic !== 'string') {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        // Sanitize input (this is a basic example, consider using a library like express-validator for more robust validation)
        const sanitizedTopic = topic.trim();

        // Create a new user topic document
        const newUserTopic = new UserTopic({
            latitude,
            longitude,
            topic: sanitizedTopic
        });

        // Save to database
        await newUserTopic.save();

        res.json({ message: 'Topic received successfully', data: newUserTopic });
    } catch (error) {
        console.error('Error posting user topic:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
