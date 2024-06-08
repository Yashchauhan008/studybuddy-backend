const express = require('express');
const { addCode, getAllCode, editCode, getCodeByQuestion } = require('../controllers/code.controller');
const codeRouter = express.Router();

codeRouter.post('/', addCode);

module.exports =codeRouter;
