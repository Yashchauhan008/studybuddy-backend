const express =require('express')
const imageRouter = express.Router()
const { addImage } = require('../controllers/image.controller')

imageRouter.post("/",addImage)

module.exports = imageRouter