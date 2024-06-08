const express =require('express')
const resourceRouter = express.Router()
const { addResource } = require('../controllers/resource.controller')

resourceRouter.post("/",addResource)

module.exports = resourceRouter;