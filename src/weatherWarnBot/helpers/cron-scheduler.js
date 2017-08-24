'use strict';

const { CronJob } = require('cron');

const configureCron = (cronTime, action) =>
    new CronJob(cronTime, action, true, 'Europe/Madrid');

const schedule = (cronTime, action) => {
    const job = configureCron(cronTime, action);
    job.start();
    return job;
};

const unschedule = (job) => job.stop();

module.exports = { schedule, unschedule };
