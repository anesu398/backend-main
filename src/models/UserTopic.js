// models/UserTopic.js
const mongoose = require('mongoose');

const userTopicSchema = new mongoose.Schema({
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const UserTopic = mongoose.model('UserTopic', userTopicSchema);

module.exports = UserTopic;
