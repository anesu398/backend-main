// services/areaStatusService.js
const AreaStatus = require('../models/AreaStatus');

exports.getAreaStatus = async (suburb) => {
    try {
        const areaStatus = await AreaStatus.findOne({ suburb });
        return areaStatus;
    } catch (error) {
        console.error('Error fetching area status:', error);
        throw new Error('Error fetching area status');
    }
};
