const express = require('express')
const subjectRouter = express.Router();
const { newSubject, getAllSubjects, getSubjectById,getSubjectByName, getSubjectWithQuestions } = require('../controllers/subject.controller')

subjectRouter.post('/',newSubject);
subjectRouter.get('/',getAllSubjects);
subjectRouter.get('/:id',getSubjectById);
subjectRouter.get('/name/:name', getSubjectByName);
subjectRouter.get('/prep/:subjectId', getSubjectWithQuestions);


module.exports = subjectRouter;