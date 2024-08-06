// controllers/upcomingEventsController.js
const Event = require('../models/Event');

exports.getUpcomingEvents = async (req, res) => {
    try {
        const today = new Date();
        const upcomingEvents = await Event.find({ date: { $gte: today } }).sort({ date: 1 });

        res.json({ events: upcomingEvents });
    } catch (error) {
        console.error('Error fetching upcoming events:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
