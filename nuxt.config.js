// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: 
    {
        openWeatherApiKey: process.env.OPEN_WEATHER_API_KEY
    },
    modules: 
    [
        '@nuxtjs/tailwindcss',
    ],
    app:
    {
        head: 
        {
            title: 'Energy Monitor',
            meta: 
            [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'description', content: 'Energy Monitor' },
                { charset: 'utf-8' },
            ],
            link:
            [
                { rel: 'script', href: 'https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.4/flowbite.min.js' },
                { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css' },
            ]
        }
    }
})
