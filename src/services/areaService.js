const LoadsheddingStatus = require('../models/loadsheddingStatus');

/**
 * Fetches the load shedding status for a given area (suburb).
 * @param {string} areaName - The name of the area (suburb).
 * @returns {Promise<string>} - The load shedding status of the area.
 */
exports.getAreaStatus = async (areaName) => {
    try {
        const status = await LoadsheddingStatus.findOne({ suburb: areaName }).exec();
        if (!status) {
            return `No load shedding status found for suburb '${areaName}'`;
        }
        return `Status for ${areaName}: ${status.status}, Stage: ${status.stage}, Start: ${status.startTime}, End: ${status.endTime}`;
    } catch (error) {
        console.error(`Error fetching load shedding status for suburb '${areaName}':`, error);
        throw new Error('Failed to fetch load shedding status');
    }
};
