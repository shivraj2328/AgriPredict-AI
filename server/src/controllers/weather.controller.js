const { getWeatherData } = require("../services/weather.service");

const getWeather = async (req, res) => {
    try {
        const { latitude, longitude } = req.body;

        if (latitude == null || longitude == null) {
            return res.status(400).json({
                message: "Latitude and longitude are required"
            });
        }

        const weather = await getWeatherData(latitude, longitude);

        return res.status(200).json(weather);
    } catch (error) {
        console.error("Weather controller error:", error.message);

        return res.status(500).json({
            message: "Failed to fetch weather data"
        });
    }
};

module.exports = {
    getWeather
};