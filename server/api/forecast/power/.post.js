/*
    * path /api/forecast/power
    * method POST
    * description Returns the expected power generation for a given solar arrangement and location
    * @params {Number} latitude
    * @params {Number} longitude
    * @body {Object} {area: Number, angle: Number, direction: Number}
    * @response {Object} {location: Array, weather: Array}
*/

import { sendError } from "h3";
import OpenWeather from "../../../utils/OpenWeather";
import IntensityCalculator from "../../../utils/IntensityCalculator";
import SolarArrayModel from "../../../utils/SolarArrayModel";

export default defineEventHandler( async (event) =>
{
    const { latitude, longitude } = event.context.query;
    const body = await readBody(event);
    console.log(body);

    const { area, angle, direction } = body;

    if(area === undefined || angle === undefined || direction === undefined)
    {
        return sendError(event, createError({statusCode: 400, statusMessage: 'Missing area, angle or direction for solar array'}))
    }

    
    const weather = new OpenWeather(latitude, longitude, process.env.OPEN_WEATHER_API_KEY);
    const forecast = await weather.getForecast()

    forecast.weather.forEach((weatherPoint, index) =>
    {
        let dateTime = new Date(weatherPoint.dateTime * 1000).toLocaleString("en-US");
        let intensityCalculator = new IntensityCalculator(dateTime, forecast.location.latitude, forecast.location.longitude, weatherPoint.altitude);

        let solarArrayModel = new SolarArrayModel(intensityCalculator, area, angle, direction, weatherPoint.cloudCover, weatherPoint.temperature);

        forecast.weather[index].solarArray = 
        {
            area,
            angle,
            direction
        }

        forecast.weather[index].power = 
        {
            "incidentPower": solarArrayModel.getPower(),
            "realisticPower": solarArrayModel.getRealisticPower()
        }
    });

    return {
        forecast
    }
    
});