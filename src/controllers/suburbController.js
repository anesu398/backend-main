
const Suburb = require('../models/Suburb');


exports.getAllSuburbs = async (req, res) => {
    try {
        const suburbs = await Suburb.find();
        res.status(200).json(suburbs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getSuburbByCode = async (req, res) => {
    try {
        const suburb = await Suburb.findOne({ code: req.params.code });
        if (suburb) {
            res.status(200).json(suburb);
        } else {
            res.status(404).json({ message: "Suburb not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.createSuburb = async (req, res) => {
    const { suburb, code, latitude, longitude } = req.body;
    const newSuburb = new Suburb({
        suburb,
        code,
        location: {
            type: 'Point',
            coordinates: [longitude, latitude]
        }
    });

    try {
        const existingSuburb = await Suburb.findOne({ $or: [{ suburb }, { code }] });
        if (existingSuburb) {
            return res.status(400).json({ message: "Suburb with this code or name already exists" });
        }
        const savedSuburb = await newSuburb.save();
        res.status(201).json(savedSuburb);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateSuburb = async (req, res) => {
    const { suburb, latitude, longitude } = req.body;
    try {
        const updatedSuburb = await Suburb.findOneAndUpdate(
            { code: req.params.code },
            {
                suburb,
                location: {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                }
            },
            { new: true, runValidators: true }
        );
        if (updatedSuburb) {
            res.status(200).json(updatedSuburb);
        } else {
            res.status(404).json({ message: "Suburb not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.deleteSuburb = async (req, res) => {
    try {
        const deletedSuburb = await Suburb.findOneAndDelete({ code: req.params.code });
        if (deletedSuburb) {
            res.status(200).json(deletedSuburb);
        } else {
            res.status(404).json({ message: "Suburb not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
