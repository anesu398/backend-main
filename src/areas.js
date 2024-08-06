const mongoose = require('mongoose');
const AreaStatus = require('./models/AreaStatus'); // Adjust the path as necessary

// MongoDB connection string - replace 'your_connection_string' with your actual connection string
const mongoURI = 'mongodb+srv://ndabaprinco:0787008238@zesapush.bax9exp.mongodb.net/Zesa';

const sampleData = [
  {
    suburb: "Greendale",
    status: "Scheduled",
    stage: "Stage 2",
    startTime: new Date('2024-08-04T08:00:00'),
    endTime: new Date('2024-08-04T12:00:00')
  },
  {
    suburb: "Borrowdale",
    status: "Unscheduled",
    stage: "Stage 3",
    startTime: new Date('2024-08-05T14:00:00'),
    endTime: new Date('2024-08-05T18:00:00')
  },
  {
    suburb: "Avondale",
    status: "Scheduled",
    stage: "Stage 1",
    startTime: new Date('2024-08-06T09:00:00'),
    endTime: new Date('2024-08-06T13:00:00')
  }
];

async function seedDB() {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB.");

    // Clear the existing entries
    await AreaStatus.deleteMany({});
    console.log("Cleared existing AreaStatus data.");

    // Insert new entries
    await AreaStatus.insertMany(sampleData);
    console.log("Inserted new sample data into AreaStatus collection.");

  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

seedDB();
