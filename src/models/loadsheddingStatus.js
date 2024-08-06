const mongoose = require('mongoose');

const loadsheddingStatusSchema = new mongoose.Schema({
  suburb: { type: String, required: true },
  status: { type: String, enum: ['Scheduled', 'Unscheduled'], required: true },
  stage: { type: Number, required: true }, 
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true }
});

const LoadsheddingStatus = mongoose.model('LoadsheddingStatus', loadsheddingStatusSchema);

module.exports = LoadsheddingStatus;
