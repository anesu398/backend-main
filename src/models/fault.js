const mongoose = require('mongoose');

const faultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  suburb: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Reported', 'In Progress', 'Resolved'], default: 'Reported' },
  reportedAt: { type: Date, default: Date.now }
});

const Fault = mongoose.model('Fault', faultSchema);

module.exports = Fault;
