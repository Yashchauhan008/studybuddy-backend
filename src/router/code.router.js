const express = require('express');
const { addCode, getAllCode, editCode, getCodeByQuestion } = require('../controllers/code.controller');
const codeRouter = express.Router();

codeRouter.post('/', addCode);
codeRouter.get('/', getAllCode);
codeRouter.put('/:id', editCode);
codeRouter.get('/question/:questionId', getCodeByQuestion);

module.exports =codeRouter;
