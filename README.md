# simple-tgram-bots
A small collection of my personal Telegram app bots.

:exclamation: package.json configured for them to work in local enviroment.

To run the bots:
* Modify the "main" property to fit the bot you want to run, currently "src/weatherWarnBot/bot.js".
* Run: `BOT_TOKEN='<your token>' npm start`

### Little Apple Bot
This is a very simple bot whose purpose is to troll people in chats. It replies users every time they say a number with quick humoristic rhymes.

### Weather Warn Bot
This bot is designed to warn groups whenever the next day will have big weather changes, aka rain, big temperature change, or others.

This bot uses the OpenWeatherMap API, http://openweathermap.org for forecasts.

##### Supported commands:
* /help - explains briefly the availiable commands.
* /forecast - gives today's forecast for a specified city.
* /schedule - schedules climate change warnings for a specified city.
* /unschedule - unschedules warnings for a specified city.

##### Supported languages:
Spanish

### MeetupBot
WIP.
