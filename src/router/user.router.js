const express = require('express');
const userRouter = express.Router();
const {signIn, signUp, addUser} = require('../controllers/user.controller');

userRouter.post('/signin',signIn);
userRouter.post('/signup',signUp);
userRouter.post('/new',addUser);

module.exports = userRouter