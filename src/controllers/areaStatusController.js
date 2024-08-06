const LoadsheddingStatus = require('../models/loadsheddingStatus');
const cache = require('../utils/cache'); // Assume some caching utility is set up

/**
 * Controller function to get the load shedding status of a specific area.
 * Utilizes caching for frequent requests to improve performance.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.getAreaStatus = async (req, res) => {
  const { suburb } = req.params;

  if (!suburb) {
    return res.status(400).json({ message: 'Suburb parameter is required' });
  }

  // Validate input to ensure it's clean and expected
  if (typeof suburb !== 'string' || suburb.length < 1) {
    return res.status(400).json({ message: 'Invalid suburb parameter' });
  }

  // Cache check
  const cacheKey = `loadshedding-${suburb.toLowerCase()}`;
  const cachedData = await cache.get(cacheKey);
  if (cachedData) {
    console.log(`Cache hit for ${suburb}`);
    return res.status(200).json({ status: cachedData });
  }

  try {
    console.log(`Querying load shedding status for suburb: ${suburb}`);

    // Efficient query with indexed search
    const status = await LoadsheddingStatus.find({
      suburb: { $regex: `^${suburb}$`, $options: 'i' }
    }).lean(); // lean for performance when you just need plain JSON

    if (status.length === 0) {
      return res.status(404).json({ message: `No status found for suburb containing '${suburb}'` });
    }

    // Set cache with expiration (e.g., 1 hour)
    await cache.set(cacheKey, status, 3600);

    res.status(200).json({ status });
  } catch (error) {
    console.error(`Error querying load shedding status for suburb containing '${suburb}':`, error);
    res.status(500).json({ message: 'Failed to fetch load shedding status' });
  }
};
