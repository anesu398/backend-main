const mongoose = require('mongoose');
const Suburb = require('../models/Suburb');

// Helper function to validate latitude and longitude
const isValidLatitude = (lat) => lat >= -90 && lat <= 90;
const isValidLongitude = (lon) => lon >= -180 && lon <= 180;

exports.getAreasNearby = async (req, res) => {
    const { lat, lon, radius = 10 } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    if (!isValidLatitude(parseFloat(lat)) || !isValidLongitude(parseFloat(lon))) {
        return res.status(400).json({ message: 'Invalid latitude or longitude values' });
    }

    try {
        const radiusInMiles = parseFloat(radius);
        const radiusInRadians = radiusInMiles / 3963.2; // Convert miles to radians

        const nearbySuburbs = await Suburb.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[parseFloat(lon), parseFloat(lat)], radiusInRadians]
                }
            }
        }).select('suburb location');

        if (nearbySuburbs.length === 0) {
            return res.status(404).json({ message: 'No nearby suburbs found' });
        }

        const nearbyAreas = nearbySuburbs.map(suburb => ({
            suburb: suburb.suburb,
            distance: vincentyDistance(
                { lat: parseFloat(lat), lon: parseFloat(lon) },
                { lat: suburb.location.coordinates[1], lon: suburb.location.coordinates[0] }
            )
        }));

        res.status(200).json({ nearbyAreas });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Helper function to calculate distance using Vincenty's formula
const vincentyDistance = (coord1, coord2) => {
    const a = 6378137; // Semi-major axis of the Earth in meters
    const f = 1 / 298.257223563; // Flattening of the Earth
    const b = 6356752.3142; // Semi-minor axis

    const L = degreesToRadians(coord2.lon - coord1.lon);
    const U1 = Math.atan((1 - f) * Math.tan(degreesToRadians(coord1.lat)));
    const U2 = Math.atan((1 - f) * Math.tan(degreesToRadians(coord2.lat)));

    const sinU1 = Math.sin(U1);
    const cosU1 = Math.cos(U1);
    const sinU2 = Math.sin(U2);
    const cosU2 = Math.cos(U2);

    let lambda = L;
    let lambdaP;
    let iterLimit = 100;
    let sinSigma;
    let cosSigma;
    let sigma;
    let sinAlpha;
    let cosSqAlpha;
    let cos2SigmaM;
    let C;

    do {
        const sinLambda = Math.sin(lambda);
        const cosLambda = Math.cos(lambda);
        sinSigma = Math.sqrt((cosU2 * sinLambda) * (cosU2 * sinLambda) +
            (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) *
            (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda));
        if (sinSigma === 0) return 0; // Co-incident points

        cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
        sigma = Math.atan2(sinSigma, cosSigma);
        sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma;
        cosSqAlpha = 1 - sinAlpha * sinAlpha;
        cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha;
        if (isNaN(cos2SigmaM)) cos2SigmaM = 0; // Equatorial line: cosSqAlpha=0

        C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
        lambdaP = lambda;
        lambda = L + (1 - C) * f * sinAlpha *
            (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
    } while (Math.abs(lambda - lambdaP) > 1e-12 && --iterLimit > 0);

    if (iterLimit === 0) return NaN; // Formula failed to converge

    const uSq = cosSqAlpha * (a * a - b * b) / (b * b);
    const A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
    const B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
    const deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) -
        B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));

    const s = b * A * (sigma - deltaSigma);

    return s / 1609.34; // Convert meters to miles
};

// Helper function to convert degrees to radians
const degreesToRadians = (degrees) => degrees * Math.PI / 180;
