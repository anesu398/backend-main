const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Fault = require('../models/fault');

dotenv.config();

const seedFaults = async () => {
  const url = process.env.MONGO_URI || 'mongodb://127.0.0.1/zetdc_test_db';
  
  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

    const faults = [
      {
        userId: new mongoose.Types.ObjectId(),
        suburb: 'Khumalo',
        description: 'Power outage in the area due to transformer failure',
      },
      {
        userId: new mongoose.Types.ObjectId(),
        suburb: 'Hillside',
        description: 'Frequent power cuts in the last 24 hours',
      },
      {
        userId: new mongoose.Types.ObjectId(),
        suburb: 'City Center',
        description: 'Voltage fluctuations causing damage to appliances',
      }
    ];

    await Fault.deleteMany({});
    await Fault.insertMany(faults);

    console.log('Faults data seeded successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding faults data:', error);
    mongoose.connection.close();
  }
};

seedFaults();
