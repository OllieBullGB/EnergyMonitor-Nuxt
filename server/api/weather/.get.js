/*
    * @path /api/weather
    * @method GET
    * @description Returns the current weather forecast at the given latitude and longitude
    * @params {Number} latitude
    * @params {Number} longitude
    * @response {Object} {weather: Array}
*/

import { sendError } from "h3";
import OpenWeather from "../utils/OpenWeather";

export default defineEventHandler( async (event) =>
{
    const { latitude, longitude } = event.context.query;

    const weather = new OpenWeather(latitude, longitude, process.env.OPEN_WEATHER_API_KEY);
    const forecast = await weather.getForecast()

    return {
        forecast
    }
});