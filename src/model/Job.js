let data=[
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

    module.exports = {
        get(){
            return data;
        },
        update(newJob){
            data = newJob;
        },
        create(newJob){
            data.push(newJob);
        },
        delete(oldJob){
            data = data.filter((job) => Number(job.id) !== Number(oldJob));
        }
    }