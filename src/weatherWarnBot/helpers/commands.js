"use strict";

const cron = require("./cron-scheduler"),
  templates = require("./templates"),
  weather = require("./weather");

function schedule(jobs, city, countryCode) {
  const job = cron.schedule("00 00 20 * * 1-7", async reply => {
    const msg = await weather.getForecastWarnMessage(city, countryCode);

    if (msg !== null) {
      reply(msg);
    }
  });

  jobs.set(city, job);
  return templates.schedule(city);
}

function unschedule(jobs, cityId) {
  const job = jobs.get(cityId);
  cron.unschedule(job);
  return templates.unschedule(cityId);
}

async function forecast(city, countryCode) {
  const message = await weather.getForecastMessage(
    city,
    countryCode,
    weather.daysEnum.TOMORROW
  );
  return message;
}

function help() {
  return templates.help;
}

module.exports = { forecast, help, schedule, unschedule };
