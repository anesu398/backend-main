const mongoose = require('mongoose');

const electricityDistributionSchema = new mongoose.Schema({
  suburb: String,
  status: String,
  startTime: Date,
  endTime: Date,
  stage: Number,
  upcomingStages: [
    {
      stage: Number,
      startTime: Date,
      endTime: Date,
    },
  ],
});

const ElectricityDistribution = mongoose.model('ElectricityDistribution', electricityDistributionSchema);

module.exports = ElectricityDistribution;
