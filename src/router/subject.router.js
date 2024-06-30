const express = require('express')
const subjectRouter = express.Router();
const { newSubject, getAllSubjects, getSubjectById,getSubjectByName, getSubjectWithQuestions,updateSubjectById } = require('../controllers/subject.controller')

subjectRouter.post('/',newSubject);
subjectRouter.get('/',getAllSubjects);
subjectRouter.get('/:id',getSubjectById);
subjectRouter.get('/name/:name', getSubjectByName);
subjectRouter.get('/prep/:subjectId', getSubjectWithQuestions);
subjectRouter.put('/:id', updateSubjectById);

module.exports = subjectRouter;