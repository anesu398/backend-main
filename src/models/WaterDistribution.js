const mongoose = require('mongoose');

const waterDistributionSchema = new mongoose.Schema({
  area: String,
  status: String,
  outageStartTime: Date,
  outageEndTime: Date,
  affectedZones: [String],
});

const WaterDistribution = mongoose.model('WaterDistribution', waterDistributionSchema);

module.exports = WaterDistribution;
