const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Suburb = require('./models/Suburb');

// Read places data from JSON file
const placesPath = path.join(__dirname, '../zimbabwe_places.json');
const places = JSON.parse(fs.readFileSync(placesPath, 'utf8'));

async function seedSuburbs() {
  try {
    await mongoose.connect('mongodb+srv://ndabaprinco:0787008238@zesapush.bax9exp.mongodb.net/Zesa', { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });

    // Iterate through the places and upsert to avoid duplicates
    for (const place of places) {
      await Suburb.updateOne(
        { suburb: place.name },
        { $set: {
          code: place.code,
          suburb: place.name,
          location: {
            type: 'Point',
            coordinates: [place.longitude, place.latitude]
          }
        }},
        { upsert: true }
      );
    }

    console.log('Suburbs seeded successfully');
  } catch (error) {
    console.error('Error seeding suburbs:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedSuburbs().catch(err => console.error(err));
