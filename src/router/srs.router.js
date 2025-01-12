const express = require('express')
const srsRouter = express.Router();
const { newSrs , getAllSrss, deleteSrs, updateSrs } = require('../controllers/srs.controller')

srsRouter.post('/add',newSrs)
srsRouter.get('/all',getAllSrss)
srsRouter.delete('/delete',deleteSrs)
srsRouter.put('/:id',updateSrs)


module.exports = srsRouter;