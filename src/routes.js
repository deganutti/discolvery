const express = require('express');
const routes = express.Router();

const views = __dirname + '/views/';

const profile = {
    'name': 'Luiz Gabriel Deganutti',
    'avatar': 'https://avatars.githubusercontent.com/u/18487517?v=4',
    'monthly-budget': 4000,
    'hours-per-day': 7,
    'days-per-week': 6,
    'vacation-per-year': 4,
}


routes.get('/', (req, res) => {
    return res.render(views + '/index');
});

routes.get('/job', (req, res) => {
    return res.render(views + '/job');
});


/**
 * Novo novo method post do http
 */
routes.post('/job', (req, res) => {
    return res.render(views + '/job');
});

routes.get('/job-edit', (req, res) => {
    return res.render(views + '/job-edit');
});

routes.get('/profile', (req, res) => {
    return res.render(views + '/profile', { profile: profile });
});



module.exports = routes;