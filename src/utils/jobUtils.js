module.exports ={
    remainingDays(job){
       const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed();
      
       const createdDate = new Date(job['createdAt']);
       const dueDay = createdDate.getDate() + Number(remainingDays); //dia do vencimento
       const dueDateInMs = createdDate.setDate(dueDay);
       const timeDiffInMs = dueDateInMs - Date.now();
       // transformar os milisegundo para dias.
   
       const dayInMs = 1000 * 60 * 60 * 24;
       const dayDiff = Math.floor(timeDiffInMs / dayInMs);
   
       return dayDiff;
   },
   calculateBudget:(job,priceHours)=>job['total-hours'] * priceHours ,
   
};