const express = require('express');
const questionRouter = express.Router();
const { addNewQuestion,getQuestionWithAllData} = require('../controllers/question.controller');

questionRouter.post('/', addNewQuestion);
questionRouter.get('/:questionId/all-data', getQuestionWithAllData);

// ... other routes ...

module.exports = questionRouter;