'use strict';

const { Composer } = require('micro-bot');

const cron = require('./helpers/cron-scheduler'),
    templates = require('./helpers/templates'),
    weather = require('./helpers/weather');

const bot = new Composer();
const jobs = new Map();

const warnOnWeatherChange = async (city, countryCode, reply) => {
    const msg = await weather.getForecastWarnMessage(city, countryCode);

    if (msg !== null) {
        reply(msg);
    }
};

// FIXME: make the bot identify multiple-word cities, i.e.: New York.
bot.hears(/\/schedule (\S+) (\S+)/, ({ match, reply }) => {
    const job = cron.schedule('00 00 20 * * 1-7',
        () => warnOnWeatherChange(match[1], match[2], reply));

    jobs.set(match[1], job);

    return reply(templates.schedule(match[1]));
});

bot.hears(/\/unschedule (\S+) (\S+)/, ({ match, reply }) => {
    const job = jobs.get(match[1]);
    cron.unschedule(job);
    return reply(templates.unschedule(match[1]));
});

bot.hears(/\/forecast (\S+) (\S+)/, async ({ match, reply }) =>
    reply(await weather.getForecastMessage(match[1], match[2], weather.daysEnum.TOMORROW)));

bot.hears(/\/help/, ({ reply }) =>
    reply(templates.help));

module.exports = bot;
