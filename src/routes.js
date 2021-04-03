const express = require('express');
const routes = express.Router();

const views = __dirname + '/views/';

const Profile = {
   data:{
    'name': 'Luiz Gabriel Deganutti',
    'avatar': 'https://avatars.githubusercontent.com/u/18487517?v=4',
    'monthly-budget': 4000,
    'hours-per-day': 7,
    'days-per-week': 6,
    'vacation-per-year': 4,
    'price-hours':78.85,
   },
   controllers:{
    index(req, res) {
        return res.render(views + '/profile', {profile: Profile.data});
    },
    update(req,res){
        //req.body para todos os dados.
        const data = req.body;
        
       
        //definir quantas  semanas há em um ano
        const weeksPerYear = 52;

        //remover as semanas de ferias para saber quantas semanas à em um mês.
        const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12;
        
        //quantas horas por semana trabalhadas
        const weekTotalHours = (data['hours-per-day'] * data['days-per-week']);

        //total horas trabalhadas no mes.
        const monthlyTotalHours = (weekTotalHours * weeksPerMonth);

        //valor da horas
        priceHour = (data['monthly-budget'] / monthlyTotalHours);

        //Profile.data = data; 
        Profile.data={
            ...Profile.data,
            ...req.body,
            'price-hours':priceHour,
        };

        return res.redirect('/profile');
    },
    save(req,res){

    },

   },
   
}

const Job = {
    data:[
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
    ],
    controllers:{
        index(req, res) {
            const updatedJobs = Job.data.map((job) =>{
                const remaining  = Job.services.remainingDays(job);
                const status = remaining <= 0 ? 'done' : 'progress';
                return {
                    ...job,
                    remaining,
                    status,
                    budget: Profile.data['price-hours']*job['total-hours']
                };
            });       
        
            return res.render(views + '/index',{
                jobs:updatedJobs
            });
        },
        save(req,res){
       
                    // req.body = { name: 'asdas', 'daily-hours': '3', 'total-hours': '90' },
                
                    const lastId = Job.data[Job.data.length - 1]?.id || 1;
                    const jobs = req.body;
                      
                    jobs.createdAt = Date.now(); //atribuição de data de criação da tarefa em expecifico - milisegundos;
                
                    Job.data.push({
                        'id': lastId,
                        'name': req.body['name'],
                        'daily-hours': req.body['daily-hours'],
                        'total-hours': req.body['total-hours'],
                        'createdAd': req.body['createdAt'],
                    });
                
                    return res.redirect('/');             
        },
        create(req,res){
            return res.render(views + '/job');
        }
    },
    services:{
         remainingDays(job){
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
        

    },
   
}

 



routes.get('/', Job.controllers.index);
/**
 * Novo novo method post do http
 */
routes.post('/job', Job.controllers.save);

routes.get('/job', Job.controllers.create);

routes.get('/job-edit', (req, res) => {
    return res.render(views + '/job-edit');
});

routes.get('/profile', Profile.controllers.index);
routes.post('/profile', Profile.controllers.update);

module.exports = routes;