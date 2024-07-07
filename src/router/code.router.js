const express = require('express');
const { addCode, deleteCode, getAllCode, editCode, getCodeByQuestion } = require('../controllers/code.controller');
const codeRouter = express.Router();

codeRouter.post('/', addCode);
codeRouter.delete('/', deleteCode);


module.exports =codeRouter;
