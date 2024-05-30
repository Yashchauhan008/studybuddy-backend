const express = require('express')
const subjectRouter = express.Router();
const {newSubject} = require('../controllers/subject.controller')

subjectRouter.post('/',newSubject)

module.exports = subjectRouter;