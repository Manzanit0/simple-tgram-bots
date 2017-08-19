'use strict';

// Telegraf based framework.
const { Composer } = require('micro-bot'),
    { CronJob } = require('cron');

// Local files.
const templates = require('./helpers/templates'),
    weather = require('./helpers/weather');

const bot = new Composer(),
    jobs = new Map();

const configureCron = (cronTime, location, reply) =>
    new CronJob(cronTime, async () => {
        const result = await weather.getForecast(location.city, location.code);

        try {
            // If the weather isn't clear, notify the group.
            if (!weather.isTomorrowClear(result)) {
                reply(weather.getFormattedForecastMessage(result));
            }
        } catch (err) {
            reply(templates.errorMessage);
        }

        // This runs when the job is terminated.
    }, () => {
        reply(templates.unschedule(location.city));
    },
    true, // Starts the job inmediatly.
    'Europe/Madrid'
    );

bot.hears(/\/schedule (\S+) (\S+)/, ({ match, reply }) => {

    // Extract location from the command.
    const location = { city: match[1], code: match[2] };

    const job = configureCron('00 00 20 * * 1-7', location, reply);
    job.start();
    jobs.set(match[1], job);

    return reply(templates.schedule(location.city));
});

bot.hears(/\/unschedule (\S+) (\S+)/, ({ match }) => {
    jobs.get(match[1]).stop();
    jobs.delete(match[1]);
});

bot.hears(/\/forecast (\S+) (\S+)/, async ({ match, reply }) => {
    try {
        const result = await weather.getForecast(match[1], match[2]);
        reply(weather.getFormattedForecastMessage(result));
    } catch (err) {
        reply(templates.errorMessage);
    }
});

bot.hears(/\/help/, ({ reply }) => reply(templates.help));

// Export bot handler
module.exports = bot;
