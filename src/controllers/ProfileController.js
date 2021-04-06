const Profile = require('../model/Profile'); 


module.exports = {
    index(req, res) {
        return res.render( 'profile', {profile: Profile.get()});
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
        Profile.update({
            ...Profile.get(),
            ...req.body,
            'price-hours':priceHour,
        });

        return res.redirect('/profile');
    },
};