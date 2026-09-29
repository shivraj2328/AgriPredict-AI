const { getWeatherData } = require("../services/weather.service");

const getWeather = async (req, res) => {
    try {
        const { latitude, longitude } = req.body;


        // ------------------------------------------
        // Required fields
        // ------------------------------------------

        if (latitude == null || longitude == null) {
            return res.status(400).json({
                success: false,
                message:
                    "Latitude and longitude are required"
            });
        }


        // ------------------------------------------
        // Convert to numbers
        // ------------------------------------------

        const latitudeNumber = Number(latitude);
        const longitudeNumber = Number(longitude);


        // ------------------------------------------
        // Validate latitude
        // ------------------------------------------

        if (!Number.isFinite(latitudeNumber)) {
            return res.status(400).json({
                success: false,
                message:
                    `Invalid latitude value: ${latitude}`
            });
        }


        // ------------------------------------------
        // Validate longitude
        // ------------------------------------------

        if (!Number.isFinite(longitudeNumber)) {
            return res.status(400).json({
                success: false,
                message:
                    `Invalid longitude value: ${longitude}`
            });
        }


        // ------------------------------------------
        // Validate latitude range
        // ------------------------------------------

        if (
            latitudeNumber < -90 ||
            latitudeNumber > 90
        ) {
            return res.status(400).json({
                success: false,
                message:
                    `Invalid latitude value: ${latitude}. Latitude must be between -90 and 90.`
            });
        }


        // ------------------------------------------
        // Validate longitude range
        // ------------------------------------------

        if (
            longitudeNumber < -180 ||
            longitudeNumber > 180
        ) {
            return res.status(400).json({
                success: false,
                message:
                    `Invalid longitude value: ${longitude}. Longitude must be between -180 and 180.`
            });
        }


        // ------------------------------------------
        // Fetch weather
        // ------------------------------------------

        const weather = await getWeatherData(
            latitudeNumber,
            longitudeNumber
        );


        return res.status(200).json({
            success: true,
            ...weather
        });

    } catch (error) {

        console.error(
            "Weather controller error:",
            error.message
        );


        // ------------------------------------------
        // Weather provider unavailable
        // ------------------------------------------

        if (
            error.message ===
            "Weather service unavailable"
        ) {
            return res.status(503).json({
                success: false,
                message:
                    "Weather service is temporarily unavailable. Please try again later."
            });
        }


        // ------------------------------------------
        // Incomplete weather data
        // ------------------------------------------

        if (
            error.message ===
                "Incomplete current weather data received" ||
            error.message ===
                "Incomplete rainfall data received" ||
            error.message ===
                "No valid monthly rainfall data received"
        ) {
            return res.status(503).json({
                success: false,
                message:
                    "Weather data is currently unavailable for this location. Please try another location or try again later."
            });
        }


        // ------------------------------------------
        // Unexpected backend error
        // ------------------------------------------

        return res.status(500).json({
            success: false,
            message:
                "Failed to fetch weather data"
        });
    }
};


module.exports = {
    getWeather
};