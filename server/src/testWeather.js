const { getWeatherData } = require("./services/weather.service");

const latitude = 18.5204;
const longitude = 73.8567;

async function testWeather() {
    try {
        const weather = await getWeatherData(latitude, longitude);

        console.log("Weather Result:");
        console.log(weather);
    } catch (error) {
        console.error("Weather Test Failed:");
        console.error(error.message);
    }
}

testWeather();
