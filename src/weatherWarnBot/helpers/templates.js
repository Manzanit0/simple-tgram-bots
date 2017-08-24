'use strict';
const UNIX_DT_TRANSFORM_RATIO = 1000;

const help =
    `
    Los siguientes comandos están disponibles para su uso: \n
    ✔️ /forecast {CIUDAD} {CODIGO_PAIS}
    \t Devuelve el tiempo para ciudad en estos momentos.\n
    ✔️ /schedule {CIUDAD} {CODIGO_PAIS}
    \t Me programo para avisaros el día antes en caso de que vaya a llover,haya tormenta o cambios de temperatura bruscos.\n
    ✔️ /unschedule {CIUDAD} {CODIGO_PAIS}
    \t Me desprogramo para que no lleguen más notificaciones en el futuro.
    `;

const weatherReport = (forecast, cityName) =>
    `🚩 ${cityName}
    - - - - - - - - - - - - - - - - - - - - - -
    🕘 ${new Date(forecast.dt * UNIX_DT_TRANSFORM_RATIO).toDateString()}
    🌀 ${forecast.weather[0].description}
    🔰 ${forecast.temp.min}°C - ${forecast.temp.max}ºC
    💧 ${forecast.humidity}%
    💨 ${forecast.speed} m/s
    - - - - - - - - - - - - - - - - - - - - - -
    `;

const errorMessage = 'Ha habido un problema contactando con la API del tiempo. Para más información ponte en contacto con mi desarrollador 😬';

const schedule = (city) => `Notificaciones para ${city} encendidas! :)`;
const unschedule = (city) => `Notificaciones para ${city} apagadas! :)`;

module.exports = { errorMessage, help, schedule, unschedule, weatherReport };
