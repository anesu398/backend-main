const mongoose = require('mongoose');

const gasDistributionSchema = new mongoose.Schema({
  region: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Normal', 'Low Pressure', 'No Supply'],
    required: true
  },
  lastChecked: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('GasDistribution', gasDistributionSchema);
