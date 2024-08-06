const Fault = require('../models/fault');

// Report a new fault
exports.reportFault = async (req, res) => {
  try {
    const { userId, suburb, description } = req.body;

    if (!userId || !suburb || !description) {
      return res.status(400).json({ message: 'User ID, suburb, and description are required.' });
    }

    const newFault = new Fault({
      userId,
      suburb,
      description
    });

    await newFault.save();
    res.status(201).json({ message: 'Fault reported successfully', fault: newFault });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all faults for a specific suburb
exports.getFaultsBySuburb = async (req, res) => {
  try {
    const { suburb } = req.params;

    if (!suburb) {
      return res.status(400).json({ message: 'Suburb parameter is required' });
    }

    const faults = await Fault.find({ suburb: new RegExp(`^${suburb}$`, 'i') });

    if (faults.length === 0) {
      return res.status(404).json({ message: `No faults found for suburb '${suburb}'` });
    }

    res.status(200).json({ faults });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
