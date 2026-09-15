const axios = require("axios");

const getWeatherData = async (latitude, longitude) => {
    try {
        const response = await axios.get(
            "https://api.open-meteo.com/v1/forecast",
            {
                params: {
                    latitude,
                    longitude,
                    current: "temperature_2m,relative_humidity_2m,rain"
                },
                timeout: 10000
            }
        );

        const currentWeather = response.data.current;

        if (
            currentWeather?.temperature_2m == null ||
            currentWeather?.relative_humidity_2m == null ||
            currentWeather?.rain == null
        ) {
            throw new Error("Incomplete weather data received");
        }

        return {
            temperature: currentWeather.temperature_2m,
            humidity: currentWeather.relative_humidity_2m,
            rainfall: currentWeather.rain
        };
    } catch (error) {
        console.error(
            "Weather API error:",
            error.response?.data || error.message
        );

        throw new Error("Failed to fetch weather data");
    }
};

module.exports = {
    getWeatherData
};