const express =require('express')
const answerRouter = express.Router()
const { addAnswer } = require('../controllers/answer.controlller')

answerRouter.post("/",addAnswer)

module.exports = answerRouter