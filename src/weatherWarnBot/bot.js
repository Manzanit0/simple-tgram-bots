"use strict";

const { Composer } = require("micro-bot");

const { schedule, unschedule, forecast, help } = require("./helpers/commands");

const bot = new Composer();
const jobs = new Map();

// FIXME: make the bot identify multiple-word cities, i.e.: New York.
bot.hears(/\/schedule (\S+) (\S+)/, ({ match, reply }) => {
  const message = schedule(jobs, match[1], match[2]);
  return reply(message);
});

bot.hears(/\/unschedule (\S+) (\S+)/, ({ match, reply }) => {
  const message = unschedule(jobs, match[1]);
  return reply(message);
});

bot.hears(/\/forecast (\S+) (\S+)/, async ({ match, reply }) => {
  const message = await forecast(match[1], match[2]);
  return reply(message);
});

bot.hears(/\/help/, ({ reply }) => reply(help()));

module.exports = bot;
