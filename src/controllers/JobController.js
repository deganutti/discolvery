const Job = require("../model/Job");
const JobUtils = require("../utils/jobUtils");
const Profile = require("../model/Profile");
module.exports = {
  index(req, res) {
    const jobs = Job.get();
    const profile = Profile.get();
    const updatedJobs = jobs.map((job) => {
      const remaining = JobUtils.remainingDays(job);

      const status = remaining <= 0 ? "done" : "progress";
      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["price-hours"]),
      };
    });

    return res.render("index", {
      jobs: updatedJobs,
    });
  },
  save(req, res) {
    const jobs = Job.get();
    // req.body = { name: 'asdas', 'daily-hours': '3', 'total-hours': '90' },
    const lastId = jobs[jobs.length - 1]?.id || 0;

    jobs.push({
      id: lastId + 1,
      name: req.body["name"],
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      createdAt: Date.now(),
    });

    return res.redirect("/");
  },
  create(req, res) {
    return res.render("job");
  },
  show(req, res) {
    const jobs = Job.get();
    const profile = Profile.get();
    const jobId = req.params.id;

    const job = jobs.find((job) => Number(job.id) === Number(jobId));
    if (!job) {
      return res.send("Job Not found");
    }

    //valor do JOB
    job.budget = JobUtils.calculateBudget(job, profile["price-hours"]);

    return res.render("job-edit", { job });
  },
  update(req, res) {
      
    const jobs = Job.get();
    const jobId = req.params.id;

    const job = jobs.find((job) => Number(job.id) === Number(jobId));
    if (!job) {
      return res.send("Job Not found");
    }

    const updatedJob = {
      ...job, //espalhando os valores de JOB
      name: req.body["name"],
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
    };

    //atualizar os dados no array
    newJobs = jobs.map((job) => {
      if (Number(job.id) === Number(jobId)) {
        job = updatedJob;
      }
      return job;
    });
    Job.update(newJobs); 
    res.redirect("/job/" + jobId);
  },
  delete(req, res) {
    const jobId = req.params.id;

    Job.delete(jobId);
    
    res.redirect("/");
  },
};
