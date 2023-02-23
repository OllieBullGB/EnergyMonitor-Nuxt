/*
    * @path /api/forecast/intensity
    * @method GET
    * @description Returns the intensity at the given latitude and longitude as a forecast
    * @params {Number} latitude
    * @params {Number} longitude
    * @response {Object} {location: Array, weather: Array}
*/

import { sendError } from "h3";
import OpenWeather from "../../../utils/OpenWeather";
import IntensityCalculator from "../../../utils/IntensityCalculator";

export default defineEventHandler( async (event) =>
{
    const { latitude, longitude } = event.context.query;

    const weather = new OpenWeather(latitude, longitude, process.env.OPEN_WEATHER_API_KEY);
    const forecast = await weather.getForecast()

    forecast.weather.forEach((weatherPoint, index) =>
    {
        let dateTime = new Date(weatherPoint.dateTime * 1000).toLocaleString("en-US");
        let intensityCalculator = new IntensityCalculator(dateTime, forecast.location.latitude, forecast.location.longitude, weatherPoint.altitude);
        
        forecast.weather[index].intensity = 
        {
            "globalIntensity": intensityCalculator.getGlobalIntensity(),
            "directIntensity": intensityCalculator.getDirectIntensity()
        }
    });

    return {
        forecast
    }

});