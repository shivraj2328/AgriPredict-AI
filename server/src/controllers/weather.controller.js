const Prediction = require("../models/Prediction.model");

const {
    getWeatherData
} = require("../services/weather.service");

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


// ==================================================
// Get weather using latest prediction location
// ==================================================

const getLatestPredictionWeather = async (
    req,
    res
) => {
    try {

        const latestPrediction =
            await Prediction.findOne({
                user: req.user.userId
            }).sort({
                createdAt: -1
            });


        // ------------------------------------------
        // No prediction found
        // ------------------------------------------

        if (!latestPrediction) {
            return res.status(404).json({
                success: false,
                message:
                    "No prediction available yet. Make a crop prediction first."
            });
        }


        // ------------------------------------------
        // Get location from latest prediction
        // ------------------------------------------

        const latitude = Number(
            latestPrediction.latitude
        );

        const longitude = Number(
            latestPrediction.longitude
        );


        // ------------------------------------------
        // Validate stored location
        // ------------------------------------------

        if (
            !Number.isFinite(latitude) ||
            !Number.isFinite(longitude)
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Location data is not available for the latest prediction"
            });
        }


        if (
            latitude < -90 ||
            latitude > 90
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Stored latitude value is invalid"
            });
        }


        if (
            longitude < -180 ||
            longitude > 180
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Stored longitude value is invalid"
            });
        }


        // ------------------------------------------
        // Fetch weather
        // ------------------------------------------

        const weather = await getWeatherData(
            latitude,
            longitude
        );


        return res.status(200).json({
            success: true,

            weather,

            location: {
                latitude,
                longitude
            },

            updatedAt:
                latestPrediction.createdAt
        });

    } catch (error) {

        console.error(
            "Latest prediction weather error:",
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
                    "Weather data is currently unavailable for this location. Please try again later."
            });
        }


        // ------------------------------------------
        // Unexpected backend error
        // ------------------------------------------

        return res.status(500).json({
            success: false,
            message:
                "Failed to fetch weather for the latest prediction location"
        });
    }
};


module.exports = {
    getWeather,
    getLatestPredictionWeather
};