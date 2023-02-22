import human from 'human-time';

class WeatherAtTime
{
    constructor(weather)
    {
        this.dateTime = weather.dt;
        this.date = human(new Date(this.dateTime * 1000));
        this.timezone = weather.timezone;
        this.temp = weather.main.temp;
        this.altitude = weather.main.grnd_level;
        this.cloudCover = weather.clouds.all;
        this.weatherId = weather.weather[0].id;
        this.weatherName = weather.weather[0].main;
        this.weatherIcon = weather.weather[0].icon;
    }

    getDateTime()
    {
        return this.dateTime;
    }

    getDate()
    {
        return this.date;
    }

    getTimezone()
    {
        return this.timezone;
    }

    getTemp()
    {
        return this.temp;
    }

    getAltitude()
    {
        return this.altitude;
    }

    getCloudCover()
    {
        return this.cloudCover;
    }

    getWeatherId()
    {
        return this.weatherId;
    }

    getWeatherName()
    {
        return this.weatherName;
    }

    getWeatherIcon()
    {
        return this.weatherIcon;
    }

    getWeatherIconUrl()
    {
        return `http://openweathermap.org/img/w/${this.weatherIcon}.png`;
    }
}

export default WeatherAtTime;