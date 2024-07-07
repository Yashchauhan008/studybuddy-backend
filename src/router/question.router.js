const express = require('express');
const questionRouter = express.Router();
const { addNewQuestion,getQuestionWithAllData, updateQuestionPrivacy} = require('../controllers/question.controller');

questionRouter.post('/', addNewQuestion);
questionRouter.get('/:questionId/all-data', getQuestionWithAllData);
questionRouter.put('/privacy/:id',updateQuestionPrivacy);


// ... other routes ...

module.exports = questionRouter;