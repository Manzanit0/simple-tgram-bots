// Telegraf based framework.
const { Composer } = require('micro-bot');
const app = new Composer();

// Config files.
const config = require('./config');

// Sets all the words that the bot has to reply to.
const values = config.responseValues;
for (const property in values) {
    app.hears(new RegExp('^[^\/\s].*' + property + '$|^' + property + '$', 'i'), ({ reply }) => reply(values[property]));
}

// Export bot handler
module.exports = app;