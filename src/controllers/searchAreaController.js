const Area = require('../models/Area');

// Middleware for rate limiting
let requestCounts = {};

const rateLimit = (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    const windowTime = 60000; // 1 minute window
    const requestLimit = 100; // Limit to 100 requests per window

    if (!requestCounts[ip]) {
        requestCounts[ip] = [];
    }

    requestCounts[ip] = requestCounts[ip].filter(timestamp => now - timestamp < windowTime);
    if (requestCounts[ip].length >= requestLimit) {
        return res.status(429).json({ message: 'Too many requests. Please try again later.' });
    }

    requestCounts[ip].push(now);
    next();
};

// Controller for searching areas
exports.searchArea = [
    rateLimit,  // Apply rate limiting
    async (req, res) => {
        const start = Date.now();
        try {
            const searchText = req.query.text;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            // Validate input
            if (!searchText || typeof searchText !== 'string' || searchText.trim().length < 3) {
                return res.status(400).json({ message: 'Search text is required and must be at least 3 characters long' });
            }

            // Perform case-insensitive search with pagination
            const searchResults = await Area.find({
                name: { $regex: searchText, $options: 'i' }
            })
            .skip((page - 1) * limit)
            .limit(limit);

            const totalResults = await Area.countDocuments({
                name: { $regex: searchText, $options: 'i' }
            });

            const responseTime = Date.now() - start;

            res.json({
                totalResults,
                page,
                totalPages: Math.ceil(totalResults / limit),
                results: searchResults,
                responseTime: `${responseTime}ms`
            });
        } catch (error) {
            console.error('Error searching for areas:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
];
