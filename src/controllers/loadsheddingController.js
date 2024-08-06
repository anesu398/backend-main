const LoadsheddingStatus = require('../models/loadsheddingStatus');

// Controller functions for CRUD operations

// Create a new load shedding status
exports.createLoadsheddingStatus = async (req, res) => {
  try {
    const { suburb, status,stage, startTime, endTime } = req.body;
    const newStatus = new LoadsheddingStatus({ suburb, status,stage, startTime, endTime });
    const savedStatus = await newStatus.save();
    res.status(201).json(savedStatus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all load shedding statuses
exports.getAllLoadsheddingStatuses = async (req, res) => {
  try {
    const statuses = await LoadsheddingStatus.find();
    res.status(200).json(statuses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single load shedding status by ID
exports.getLoadsheddingStatusById = async (req, res) => {
  try {
    const status = await LoadsheddingStatus.findById(req.params.id);
    if (!status) {
      return res.status(404).json({ message: 'Load shedding status not found' });
    }
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update loadshedding status by ID
exports.updateLoadsheddingStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedStatus = await LoadsheddingStatus.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedStatus) {
      return res.status(404).json({ message: 'Loadshedding status not found' });
    }

    res.status(200).json({ message: 'Loadshedding status updated successfully', updatedStatus });
  } catch (error) {
    res.status(400).json({ message: 'Invalid input', error: error.message });
  }
};
// Delete a load shedding status by ID
exports.deleteLoadsheddingStatusById = async (req, res) => {
  try {
    const deletedStatus = await LoadsheddingStatus.findByIdAndDelete(req.params.id);
    if (!deletedStatus) {
      return res.status(404).json({ message: 'Load shedding status not found' });
    }
    res.status(200).json({ message: 'Load shedding status deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
