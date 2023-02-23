/*
    * @path /api/forecast/power/totals
    * @method POST
    * @description Returns the expected power generation over the next 5 days for a given solar arrangement and location
    * @params {String} date
    * @params {Number} latitude
    * @params {Number} longitude
    * @body {Object} {area: Number, angle: Number, direction: Number}
    * @response {Object} {totals: Array}
*/

import { sendError } from "h3";
import OpenWeather from "~~/server/utils/OpenWeather"
import IntensityCalculator from "~~/server/utils/IntensityCalculator"
import SolarArrayModel from "~~/server/utils/SolarArrayModel"

export default defineEventHandler( async (event) =>
{
    const { latitude, longitude } = event.context.query;
    const body = await readBody(event);

    const { area, angle, direction } = body;

    if(area === undefined || angle === undefined || direction === undefined)
    {
        return sendError(event, createError({statusCode: 400, statusMessage: 'Missing area, angle or direction for solar array'}));
    }



    const weather = new OpenWeather(latitude, longitude, process.env.OPEN_WEATHER_API_KEY);
    const forecast = await weather.getForecast()

    const totals = {};

    forecast.weather.forEach((weatherPoint, index) =>
    {
        let today = new Date();
        let todayDay = today.getDate();
        let date = new Date(weatherPoint.dateTime * 1000);
        let dateTime = new Date(weatherPoint.dateTime * 1000).toLocaleString("en-US");
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedDate = dd + '/' + mm + '/' + yyyy;

        const solarArrayModel = new SolarArrayModel(new IntensityCalculator(dateTime, forecast.location.latitude, forecast.location.longitude, weatherPoint.altitude, forecast.location.sunrise, forecast.location.sunset), area, angle, direction, weatherPoint.cloudCover, weatherPoint.temperature);

        if(todayDay !== dd)
        {
            if(totals[formattedDate] === undefined)
            {
                totals[formattedDate] = 0;
            }


            totals[formattedDate] = totals[formattedDate] + solarArrayModel.getRealisticPower() * 3;
        }
        
    });

    return {
        totals
    }
});