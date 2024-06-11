const express = require('express');
const questionRouter = express.Router();
const { addQuestion } = require('../controllers/question.controller');

questionRouter.post('/',addQuestion);
// questionRouter.get('/questions/subject/:subjectId', getQuestionsBySubject);

module.exports = questionRouter