const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
  requestId: String,
  type: String,
  status: String,
  createdAt: Date,
  updatedAt: Date,
  details: String,
  requester: String,
});

const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema);

module.exports = ServiceRequest;
