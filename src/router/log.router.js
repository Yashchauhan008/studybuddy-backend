// routes/logRoutes.js
const express = require('express');
const { createLog, getLogsByUsername, getAllLogsSortedByTime } = require('../controllers/log.controller');

const logRouter = express.Router();

logRouter.post('/add', createLog);
logRouter.get('/all', getAllLogsSortedByTime); // New route for all logs sorted by time
logRouter.get('/user/:username', getLogsByUsername); // Updated route for username

module.exports = logRouter;
