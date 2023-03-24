import WeatherAtTime from './WeatherAtTime'
import fetch from 'node-fetch';

class OpenWeather 
{
    weatherPoints;
    location;

    constructor(latitude, longitude, apiKey)
    {
        this.latitude = latitude;
        this.longitude = longitude;
        this.apiKey = apiKey;

        this.weatherPoints = {}
        this.location = {}
    }

    async getForecast()
    {
        let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.latitude}&lon=${this.longitude}&appid=${this.apiKey}`;
        
        const response = await fetch(url);
        
        const data = await response.json();
        
        this.weatherPoints = data.list.map(weather => new WeatherAtTime(weather));
        

        this.location = 
        {
            "latitude": data.city.coord.lat,
            "longitude": data.city.coord.lon,
            "name": data.city.name,
            "country": data.city.country,
            "timezone": data.city.timezone,
            "sunrise": data.city.sunrise,
            "sunset": data.city.sunset
        }
        
        return {
            location: this.location,
            weather: this.weatherPoints
        }
    }

    getWeatherPoints()
    {
        return this.weatherPoints;
    }
}

export default OpenWeather;