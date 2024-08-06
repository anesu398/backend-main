// models/Area.js
const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    description: {
        type: String
    }
});

const Area = mongoose.model('Area', areaSchema);

module.exports = Area;
