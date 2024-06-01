const express = require('express');
const userRouter = express.Router();
const {signIn, signUp, addUser, allUser,complateQuestion,getCompletedQuestionIdsByUsername} = require('../controllers/user.controller');

userRouter.post('/signin',signIn);
userRouter.post('/signup',signUp);
userRouter.post('/new',addUser);
userRouter.get('/',allUser);
userRouter.post('/complate',complateQuestion);
userRouter.get('/complate/:username',getCompletedQuestionIdsByUsername);


module.exports = userRouter