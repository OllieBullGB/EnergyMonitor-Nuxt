import IntensityCalculator from '~~/server/utils/IntensityCalculator';

class SolarArrayModel
{
    constructor(intensityCalculator, area, angle, direction, cloudCover, temperature)
    {
        this.intensityCalculator = intensityCalculator;
        this.area = area; // m^2
        this.angle = angle; // deg
        this.direction = direction; // deg
        this.cloudCover = cloudCover; // decimal
        this.temperature = temperature; // kelvin
    }

    setIntensityCalculator(intensityCalculator)
    {
        this.intensityCalculator = intensityCalculator;
    }

    getTemperatureCoefficient()
    {
        if(this.temperature > 298.15)
        {
            return 1 - (298.15 - this.temperature) / 100
        }
        else 
        {
            return 1
        }
    }

    getCloudCoverCoefficient()
    {
        // 0% cloud cover = 100% efficiency
        // 100% cloud cover = ~40% efficiency
        // Needs retuning with more accurate data
        return (100 - (this.cloudCover * 0.6)) / 100;
    }

    getIncidentIntensity()
    {
        const globalIntensity = this.intensityCalculator.getGlobalIntensity();
        const coefficient = this.getTemperatureCoefficient() * this.getCloudCoverCoefficient();
        let incidentIntensity = globalIntensity * coefficient;

        return incidentIntensity;
    }

    getPower()
    {
        let rElevation = IntensityCalculator.degToRad(this.intensityCalculator.getElevation());
        let rAzimuth = IntensityCalculator.degToRad(this.intensityCalculator.getAzimuth());
        let rAngle = IntensityCalculator.degToRad(this.angle);
        let rDirection = IntensityCalculator.degToRad(this.direction);
        let incidentIntensity = this.getIncidentIntensity();

        let moduleRadiation = incidentIntensity * ( Math.cos(rElevation) * Math.sin(rAngle) * Math.cos(rDirection - rAzimuth) + Math.sin(rElevation) * Math.sin(rAngle));
        moduleRadiation = moduleRadiation * this.area;
        return moduleRadiation;
    }

    getRealisticPower()
    {
        // assuming 20% efficiency
        return this.getPower() * 0.2;
    }
}

export default SolarArrayModel;