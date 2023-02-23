# EnergyMonitor in Nuxt

![EnergyMonitor Logo in Green](https://raw.githubusercontent.com/OllieBullGB/EnergyMonitor/main/public/img/logo.jpg?token=GHSAT0AAAAAAB5GBTN5PV72T6MXQ4JUWPQSY7XJMCA)

EnergyMonitor was originally an Express-based web app built
by a team of Students at the University of East Anglia:
- Ollie Bull
- Scott Gurney
- Charlie Eldridge
- Ellie Hannigan

#### The Original EnergyMonitor
EnergyMonitor was originally built to assist remote communities in Cape York, Australia with the adoption of renewable energy. Providing users with a reasonably accurate prediction of their energy input (solar), storage (batteries) and expenditure.

##### Why Rewrite it?
I am using EnergyMonitor as a relevant case study to work on whilst I learn about how developing web applications with Nuxt3

### Contributing
Whilst we were proud of this system (especially due to the short timescale in which we built it). The solar calculator portion of the project is in need of some improvements. If you wish to make changes to our model or suggest any improvements that can be made, please raise an issue and state whether you wish to contribute said improvements or just wish to give ideas.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

### OpenWeatherMap API Key
EnergyMonitor utilises OpenWeatherMap for sourcing weather data for its solar calculations. To run the project you will need an API key which can be obtained [here](https://openweathermap.org/api)

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
