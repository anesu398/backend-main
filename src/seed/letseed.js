const mongoose = require('mongoose');
const GasDistribution = require('../models/GasDistribution');

// Connect to MongoDB
mongoose.connect('mongodb+srv://ndabaprinco:0787008238@zesapush.bax9exp.mongodb.net/Zesa', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Create gas distribution data
    const gasData = [
      { region: 'Region A', status: 'Normal' },
      { region: 'Region B', status: 'Low Pressure' },
      { region: 'Region C', status: 'No Supply' }
    ];
    // Insert data into collection
    GasDistribution.insertMany(gasData)
      .then(() => {
        console.log('Gas distribution data inserted successfully');
      })
      .catch(error => {
        console.error('Error inserting gas distribution data:', error);
      })
      .finally(() => {
        // Disconnect from MongoDB
        mongoose.disconnect();
      });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });
