import { it, expect, describe} from 'vitest';

import OpenWeather from "./OpenWeather";

it('valid lat, long and apiKey should return the expected weather', async () =>
{
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    const latitude = 54.7755;
    const longitude = -1.5749;

    const weather = new OpenWeather(latitude, longitude, process.env.OPEN_WEATHER_API_KEY);
    const forecast = await weather.getForecast();

    expect(forecast.location.latitude).toBe(latitude);
    expect(forecast.location.longitude).toBe(longitude);
    expect(forecast.location.name).toBe("Durham");
    expect(forecast.location.country).toBe("GB");
    expect(forecast.location.timezone).toBe(0);
    expect(typeof(forecast.weather)).toBe("object");
    expect(forecast.weather.length).toBe(40);
});

it('invalid lat, valid long and valid apiKey should return an error', async () =>
{
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    const latitude = null;
    const longitude = -1.5749;

    try
    {
        const weather = new OpenWeather(latitude, longitude, process.env.OPEN_WEATHER_API_KEY);
        const forecast = await weather.getForecast();
    }
    catch (error)
    {
        expect(error).toBeInstanceOf(Error);
    }
});

it('valid lat, invalid long and valid apiKey should return an error', async () =>
{
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    const latitude = 54.7755;
    const longitude = null;

    try
    {
        const weather = new OpenWeather(latitude, longitude, process.env.OPEN_WEATHER_API_KEY);
        const forecast = await weather.getForecast();
    }
    catch (error)
    {
        expect(error).toBeInstanceOf(Error);
    }
});

it('valid lat, valid long and invalid apiKey should return an error', async () =>
{
    const apiKey = null;
    const latitude = 54.7755;
    const longitude = -1.5749;

    try
    {
        const weather = new OpenWeather(latitude, longitude, process.env.OPEN_WEATHER_API_KEY);
        const forecast = await weather.getForecast();
    }
    catch (error)
    {
        expect(error).toBeInstanceOf(Error);
    }
});
