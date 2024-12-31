// routes/logRoutes.js
const express = require('express');
const { createLog, getLogsByUsername, getAllLogsSortedByTime } = require('../controllers/log.controller');

const logRouter = express.Router();

logRouter.post('/add', createLog);  // POST to add a new log
logRouter.get('/all', getAllLogsSortedByTime);  // GET all logs sorted by time
logRouter.get('/user/:username', getLogsByUsername);  // GET logs by username

module.exports = logRouter;
