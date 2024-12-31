// controllers/logController.js
const Log = require('../models/log.model');

// POST: Create a log
const createLog = async (req, res) => {
    try {
        const { username, message, action } = req.body;  // Now expecting action as well

        if (!username || !message || !action) {
            return res.status(400).json({ message: 'Username, message, and action are required.' });
        }

        const log = new Log({ username, message, action });  // Include action in log
        await log.save();

        res.status(201).json({ message: 'Log created successfully.', log });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

// GET: Get logs by username
const getLogsByUsername = async (req, res) => {
    try {
        const { username } = req.params; // Extract username from URL params

        if (!username) {
            return res.status(400).json({ message: 'Username is required.' });
        }

        const logs = await Log.find({ username });

        res.status(200).json({ logs });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

// GET: Get all logs sorted by timestamp
const getAllLogsSortedByTime = async (req, res) => {
    try {
        const logs = await Log.find().sort({ timestamp: -1 }); // Sort by timestamp descending

        res.status(200).json({ logs });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

module.exports = { createLog, getLogsByUsername, getAllLogsSortedByTime };
