'use strict';

const req = require('req');

const config = require('../config'),
    templates = require('./templates');

const daysEnum = {
    TODAY: 0,
    TOMORROW: 1,
    IN_2_DAYS: 2,
    IN_3_DAYS: 3,
    IN_4_DAYS: 4,
    IN_5_DAYS: 5,
    IN_6_DAYS: 6,
    IN_7_DAYS: 7,
    IN_8_DAYS: 8
};

const callAPI = async (city, countryCode) => {
    const api = `http://api.openweathermap.org/data/2.5/forecast/daily/?q=${city},${countryCode}&APPID=${config.weatherApiKey}&units=metric&lang=es`;
    const body = await req(api);
    return JSON.parse(body);
};

const getForecast = async (city, countryCode, day) => {
    const result = await callAPI(city, countryCode);
    return day === null ? result.list[daysEnum.TOMORROW] : result.list[day];
};

const getForecastMessage = async (city, countryCode, day) => {
    const forecast = await getForecast(city, countryCode, day);
    let message;
    try {
        message = templates.weatherReport(forecast, city);
    } catch (err) {
        message = templates.errorMessage;
    }

    return message;
};

const getForecastWarnMessage = async (city, countryCode) => {
    const forecast = await getForecast(city, countryCode, daysEnum.TOMORROW);
    const [ weatherCode ] = forecast.weather[0].id.toString();

    let message = null;
    if (weatherCode === '8' || weatherCode === '9') {
        try {
            message = templates.weatherReport(forecast, city);
        } catch (err) {
            message = templates.errorMessage;
        }
    }

    return message;
};

module.exports = { daysEnum, getForecast, getForecastMessage, getForecastWarnMessage };
