const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quotaSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quota: {
    type: Number,
    required: true,
    default: 10 // Set a default quota value
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const Quota = mongoose.model('Quota', quotaSchema);

module.exports = Quota;
