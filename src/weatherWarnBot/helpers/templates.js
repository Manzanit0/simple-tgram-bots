'use strict';

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
    🕘 ${forecast.dt_txt}
    🌀 ${forecast.weather[0].description}
    🔰 ${forecast.main.temp_min}°C - ${forecast.main.temp_max}ºC
    💧 ${forecast.main.humidity}%
    💨 ${forecast.wind.speed} m/s
    - - - - - - - - - - - - - - - - - - - - - -
    `;

const errorMessage = 'Ha habido un problema contactando con la API del tiempo. Para más información ponte en contacto con mi desarrollador 😬';

const schedule = (city) => `Notificaciones para ${city} encendidas! :)`;
const unschedule = (city) => `Notificaciones para ${city} apagadas! :)`;

module.exports = { errorMessage, help, schedule, unschedule, weatherReport };
