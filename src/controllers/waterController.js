const WaterStatus = require('../models/WaterStatus');
const WaterUsage = require('../models/WaterUsage');
//const WaterLeak = require('../models/WaterLeak');
// WaterBilling = require('../models/WaterBilling');
const ServiceRequest = require('../models/ServiceRequest');

// Get water status
exports.getWaterStatus = async (req, res) => {
    const { suburb } = req.params;
    const result = await WaterStatus.findOne({ suburb });
    res.json(result);
};

// Get water usage
exports.getWaterUsage = async (req, res) => {
    const { userId } = req.params;
    const result = await WaterUsage.find({ user_id: userId });
    res.json(result);
};

// Report a leak
exports.reportLeak = async (req, res) => {
    const { location, description } = req.body;
    const newLeak = new WaterLeak({ location, description });
    await newLeak.save();
    res.json({ message: 'Leak reported successfully' });
};

// Get billing info
exports.getBillingInfo = async (req, res) => {
    const { userId } = req.params;
    const result = await WaterBilling.findOne({ user_id: userId });
    res.json(result);
};

// Request a service
exports.requestService = async (req, res) => {
    const { serviceType, location, description } = req.body;
    const newServiceRequest = new ServiceRequest({ service_type: serviceType, location, description });
    await newServiceRequest.save();
    res.json({ message: 'Service request submitted successfully' });
};
