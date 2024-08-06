// services/loadsheddingService.js
const fs = require('fs');
const path = require('path');

let nationalLoadsheddingStatus = {};

const loadsheddingFilePath = path.join(__dirname, '..', 'data', 'loadsheddingStatus.json');

const readLoadsheddingStatusFromFile = () => {
    try {
        const data = fs.readFileSync(loadsheddingFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading load shedding status from file:', error);
        return {};
    }
};

exports.getNationalLoadsheddingStatus = () => {
    nationalLoadsheddingStatus = readLoadsheddingStatusFromFile();
    return nationalLoadsheddingStatus;
};

// Simulate real-time updates (update every minute)
setInterval(() => {
    nationalLoadsheddingStatus = readLoadsheddingStatusFromFile();
}, 60000); // Update every minute
