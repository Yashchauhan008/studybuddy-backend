const express = require('express');
const resourceRouter = express.Router();
const { newResource, getAllResources, deleteResource, updateResource, getResourcesByType } = require('../controllers/resource.controller');

resourceRouter.post('/add', newResource);

resourceRouter.get('/all', getAllResources);

resourceRouter.delete('/delete', deleteResource);

resourceRouter.put('/:id', updateResource);

resourceRouter.get('/type/:resourceType', getResourcesByType);

module.exports = resourceRouter;
