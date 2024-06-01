const express = require('express');
const questionRouter = express.Router();
const { addQuestion, getAllQuestions, getQuestionsBySubject } = require('../controllers/question.controller');

questionRouter.post('/',addQuestion);
questionRouter.get('/',getAllQuestions);
// questionRouter.get('/questions/subject/:subjectId', getQuestionsBySubject);

module.exports = questionRouter