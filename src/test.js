// Example script to insert a test entry into the database

const mongoose = require('mongoose');
const LoadsheddingStatus = require('./models/loadsheddingStatus');

const insertTestEntry = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/zesapushinfo', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const testEntry = new LoadsheddingStatus({
      suburb: 'Khumalo',
      status: 'Scheduled',
      stage: '2',
      startTime: new Date('2024-05-20T08:00:00Z'),
      endTime: new Date('2024-05-20T12:00:00Z'),
    });

    await testEntry.save();
    console.log('Test entry inserted');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error inserting test entry:', error);
    mongoose.disconnect();
  }
};

insertTestEntry();
