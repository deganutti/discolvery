const Job = require("../model/Job");
const JobUtils = require("../utils/jobUtils");
const Profile = require("../model/Profile");

module.exports = {
  index(req, res) {
    const jobs = Job.get();
    const profile = Profile.get();

   
    let jobTotalHours = 0;

    let statusCounts = {
      progress: 0,
      done: 0,
      total: jobs.length,
    };
    
    const updatedJobs = jobs.map((job) => {
      const remaining = JobUtils.remainingDays(job);

      const status = remaining <= 0 ? "done" : "progress";
      
      if (status === "progress") {
        jobTotalHours += Number(job["daily-hours"]);
      }
      
      statusCounts[status] += 1;

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["price-hours"]),
      };
    });
    let freeHours =Number(profile["hours-per-day"]) - Number(jobTotalHours);

    return res.render("index", {
      jobs: updatedJobs,
      profile: profile,
      statusCounts: statusCounts,
      freeHours: freeHours,
    });
  },
};
