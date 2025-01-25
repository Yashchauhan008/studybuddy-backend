const express = require('express');
const questionRouter = express.Router();
const { addNewQuestion,getQuestionWithAllData, updateQuestionPrivacy,deleteQuestionById} = require('../controllers/question.controller');

questionRouter.post('/', addNewQuestion);
questionRouter.get('/:questionId/all-data', getQuestionWithAllData);
questionRouter.put('/privacy/:id',updateQuestionPrivacy);
questionRouter.delete('/delete/:id',deleteQuestionById);


// ... other routes ...

module.exports = questionRouter;