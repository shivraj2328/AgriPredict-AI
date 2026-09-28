const { getWeatherData } = require("../services/weather.service");

const getWeather = async (req, res) => {
    try {
        const { latitude, longitude } = req.body;

        if (latitude == null || longitude == null) {
            return res.status(400).json({
                success: false,
                message: "Latitude and longitude are required"
            });
        }

        const latitudeNumber = Number(latitude);
        const longitudeNumber = Number(longitude);

        if (!Number.isFinite(latitudeNumber)) {
            return res.status(400).json({
                success: false,
                message: `Invalid latitude value: ${latitude}`
            });
        }

        if (!Number.isFinite(longitudeNumber)) {
            return res.status(400).json({
                success: false,
                message: `Invalid longitude value: ${longitude}`
            });
        }

        if (latitudeNumber < -90 || latitudeNumber > 90) {
            return res.status(400).json({
                success: false,
                message: `Invalid latitude value: ${latitude}. Latitude must be between -90 and 90.`
            });
        }

        if (longitudeNumber < -180 || longitudeNumber > 180) {
            return res.status(400).json({
                success: false,
                message: `Invalid longitude value: ${longitude}. Longitude must be between -180 and 180.`
            });
        }

        const weather = await getWeatherData(
            latitudeNumber,
            longitudeNumber
        );

        return res.status(200).json({
            success: true,
            ...weather
        });
    } catch (error) {
        console.error("Weather controller error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch weather data"
        });
    }
};

module.exports = {
    getWeather
};