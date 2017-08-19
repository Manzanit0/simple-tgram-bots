'use strict';

const req = require('req');

const config = require('../config'),
    templates = require('./templates');

const getForecast = async (city, countryCode) => {
    const api = `http://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&APPID=${config.weatherApiKey}&units=metric&lang=es`;
    const body = await req(api);
    return JSON.parse(body);
};

const isTomorrowClear = (apiResponse) => {
    const [ code ] = apiResponse.list[0].weather[0].id.toString();
    return code === '7' || code === '9';
};

const getFormattedForecastMessage = (apiResponse) => {
    const [ forecast ] = apiResponse.list;
    return templates.weatherReport(forecast, apiResponse.city.name);
};

module.exports = { getForecast, getFormattedForecastMessage, isTomorrowClear };
