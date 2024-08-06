const Quota = require('../models/Quota');

exports.tokenQuotaMiddleware = async (req, res, next) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in the request
    const quotaDoc = await Quota.findOne({ userId });

    if (!quotaDoc) {
      return res.status(403).json({ message: 'Quota not found' });
    }

    if (quotaDoc.quota > 0) {
      quotaDoc.quota -= 1;
      await quotaDoc.save();
      next();
    } else {
      res.status(403).json({ message: 'Insufficient quota' });
    }
  } catch (error) {
    console.error('Error checking quota:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
