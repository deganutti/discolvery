const express = require('express');
const routes = express.Router();
const ProfileController = require('./controllers/ProfileController');
const JobController = require('./controllers/JobController');

routes.get('/', JobController.index);
/**
 * Novo novo method post do http
 */
routes.post('/job', JobController.save);

routes.get('/job', JobController.create);

routes.post('/job/:id', JobController.update);

routes.post('/job/delete/:id', JobController.delete);

routes.get('/job/:id', JobController.show);

routes.get('/profile', ProfileController.index);
routes.post('/profile', ProfileController.update);

module.exports = routes;