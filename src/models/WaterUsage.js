const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WaterUsageSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    usage: { type: Number, required: true },
    period: { type: String, required: true }
});

module.exports = mongoose.model('WaterUsage', WaterUsageSchema);
