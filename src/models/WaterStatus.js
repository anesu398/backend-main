const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WaterStatusSchema = new Schema({
    suburb: { type: String, required: true },
    status: { type: String, required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true }
});

module.exports = mongoose.model('WaterStatus', WaterStatusSchema);
