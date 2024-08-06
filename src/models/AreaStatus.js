// models/AreaStatus.js
const mongoose = require('mongoose');

const areaStatusSchema = new mongoose.Schema({
    suburb: { type: String, required: true },
    status: { type: String, enum: ['Scheduled', 'Unscheduled'], required: true },
    stage: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true }
});

const AreaStatus = mongoose.model('AreaStatus', areaStatusSchema);

module.exports = AreaStatus;
