const mongoose = require('mongoose');

const suburbSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  suburb: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String, 
      enum: ['Point'], 
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

suburbSchema.index({ location: '2dsphere' });

const Suburb = mongoose.model('Suburb', suburbSchema);

module.exports = Suburb;
