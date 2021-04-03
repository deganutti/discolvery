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
    'price-hours':50.91
}

const job = {
    controllers:{
        index(req, res) {
            const updatedJobs = jobs.map((job) =>{
                const remaining  =remainingDays(job);
                const status = remaining <= 0 ? 'done' : 'progress';
                return {
                    ...job,
                    remaining,
                    status,
                    budget: profile['price-hours']*job['total-hours']
                };
            });
        
        
            return res.render(views + '/index',{
                jobs:updatedJobs
            });
        }
    }
}

const jobs = [
    {
        'id': 1,
        'name': 'Novo aplicativo controle financeiro',
        'daily-hours': 3,
        'total-hours': 1,
        'createdAt': Date.now(),
    },
    {
        'id': 2,
        'name': 'Ajuste login cripto',
        'daily-hours': 3,
        'total-hours': 60,
        'createdAt': Date.now(),
    }
];

function remainingDays(job){
    const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed();

    const createdDate = new Date(job['createdAt']);
    const dueDay = createdDate.getDate()+Number(remainingDays); //dia do vencimento
    const dueDate = createdDate.setDate(dueDay);
    const timeDiffInMs = dueDate - Date.now();
    // transformar os milisegundo para dias.

    const dayInMs = 1000 * 60 * 60 * 24;

    const dayDiff = (timeDiffInMs / dayInMs).toFixed();

    return dayDiff;
}


routes.get('/', job.controllers.index);

routes.get('/job', (req, res) => {

    return res.render(views + '/job');
});


/**
 * Novo novo method post do http
 */
routes.post('/job', (req, res) => {

    // req.body = { name: 'asdas', 'daily-hours': '3', 'total-hours': '90' },

    const lastId = jobs[jobs.length - 1]?.id || 1;
    const job = req.body;

    console.log(lastId);


    job.createdAt = Date.now(); //atribuição de data de criação da tarefa em expecifico - milisegundos;

    jobs.push({
        'id': lastId,
        'name': req.body['name'],
        'daily-hours': req.body['daily-hours'],
        'total-hours': req.body['total-hours'],
        'createdAd': req.body['createdAt'],
    });

    console.log(jobs);

    return res.redirect('/');
});

routes.get('/job-edit', (req, res) => {
    return res.render(views + '/job-edit');
});

routes.get('/profile', (req, res) => {
    return res.render(views + '/profile', {profile: profile});
});

module.exports = routes;