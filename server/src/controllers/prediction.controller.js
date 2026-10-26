const mongoose = require("mongoose");

const Prediction = require("../models/Prediction.model");
const Farm = require("../models/Farm.model");

const {
    getCropPrediction
} = require("../services/cropPrediction.service");

const {
    calculateSoilHealth
} = require("../services/soilHealth.service");


// Create a crop prediction
const createPrediction = async (req, res) => {
    try {
        const {
            farmId,
            nitrogen,
            phosphorus,
            potassium,
            temperature,
            humidity,
            rainfall,
            ph,
            latitude,
            longitude
        } = req.body;

        // Validate farm ID
        if (!farmId || !mongoose.isValidObjectId(farmId)) {
            return res.status(400).json({
                success: false,
                message: "A valid farm ID is required"
            });
        }

        // Ensure the farm belongs to the logged-in user
        const farm = await Farm.findOne({
            _id: farmId,
            user: req.user.userId
        });

        if (!farm) {
            return res.status(404).json({
                success: false,
                message: "Farm not found or you do not have permission to use it"
            });
        }

        // Validate required numeric inputs
        const values = {
            nitrogen,
            phosphorus,
            potassium,
            temperature,
            humidity,
            rainfall,
            ph,
            latitude,
            longitude
        };

        const hasMissingValue = Object.values(values).some(
            (value) =>
                value === undefined ||
                value === null ||
                value === "" ||
                !Number.isFinite(Number(value))
        );

        if (hasMissingValue) {
            return res.status(400).json({
                success: false,
                message:
                    "All prediction features and farm location are required and must be numeric"
            });
        }

        // Convert inputs to numbers
        const inputValues = {
            nitrogen: Number(nitrogen),
            phosphorus: Number(phosphorus),
            potassium: Number(potassium),
            temperature: Number(temperature),
            humidity: Number(humidity),
            rainfall: Number(rainfall),
            ph: Number(ph),
            latitude: Number(latitude),
            longitude: Number(longitude)
        };

        // Validate input ranges
        const validationErrors = [];

        if (inputValues.nitrogen < 0 || inputValues.nitrogen > 200) {
            validationErrors.push(
                `Nitrogen value ${inputValues.nitrogen} is invalid. It must be between 0 and 200.`
            );
        }

        if (inputValues.phosphorus < 0 || inputValues.phosphorus > 200) {
            validationErrors.push(
                `Phosphorus value ${inputValues.phosphorus} is invalid. It must be between 0 and 200.`
            );
        }

        if (inputValues.potassium < 0 || inputValues.potassium > 250) {
            validationErrors.push(
                `Potassium value ${inputValues.potassium} is invalid. It must be between 0 and 250.`
            );
        }

        if (
            inputValues.temperature < -50 ||
            inputValues.temperature > 70
        ) {
            validationErrors.push(
                `Temperature value ${inputValues.temperature} is invalid. It must be between -50 and 70°C.`
            );
        }

        if (inputValues.humidity < 0 || inputValues.humidity > 100) {
            validationErrors.push(
                `Humidity value ${inputValues.humidity} is invalid. It must be between 0 and 100%.`
            );
        }

        if (inputValues.rainfall < 0 || inputValues.rainfall > 1000) {
            validationErrors.push(
                `Rainfall value ${inputValues.rainfall} is invalid. It must be between 0 and 1000 mm.`
            );
        }

        if (inputValues.ph < 0 || inputValues.ph > 14) {
            validationErrors.push(
                `Soil pH value ${inputValues.ph} is invalid. It must be between 0 and 14.`
            );
        }

        if (
            inputValues.latitude < -90 ||
            inputValues.latitude > 90
        ) {
            validationErrors.push(
                `Latitude value ${inputValues.latitude} is invalid. It must be between -90 and 90.`
            );
        }

        if (
            inputValues.longitude < -180 ||
            inputValues.longitude > 180
        ) {
            validationErrors.push(
                `Longitude value ${inputValues.longitude} is invalid. It must be between -180 and 180.`
            );
        }

        if (validationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Please correct the invalid prediction values",
                errors: validationErrors
            });
        }

        // Generate AI prediction
        const aiResult = await getCropPrediction(inputValues);

        // Validate AI result
        if (
            !aiResult ||
            !aiResult.crop ||
            !Number.isFinite(Number(aiResult.confidence))
        ) {
            const aiError = new Error("Invalid AI prediction result");
            aiError.code = "AI_PREDICTION_ERROR";
            throw aiError;
        }

        // Save prediction with its farm reference
        const prediction = await Prediction.create({
            user: req.user.userId,
            farm: farm._id,

            nitrogen: inputValues.nitrogen,
            phosphorus: inputValues.phosphorus,
            potassium: inputValues.potassium,
            temperature: inputValues.temperature,
            humidity: inputValues.humidity,
            rainfall: inputValues.rainfall,
            ph: inputValues.ph,
            latitude: inputValues.latitude,
            longitude: inputValues.longitude,

            recommendedCrop: aiResult.crop,
            confidence: aiResult.confidence
        });

        return res.status(201).json({
            success: true,
            message: "Crop prediction generated and saved successfully",
            prediction
        });

    } catch (error) {
        console.error("Prediction error:", error.message);

        if (error.code === "AI_PREDICTION_ERROR") {
            return res.status(503).json({
                success: false,
                message:
                    "Unable to generate crop prediction right now. Please try again later."
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to generate and save crop prediction"
        });
    }
};


// Get prediction history for the logged-in user
const getPredictionHistory = async (req, res) => {
    try {
        const predictions = await Prediction.find({
            user: req.user.userId
        })
            .populate("farm", "name")
            .sort({ createdAt: -1 })
            .lean();

        // Calculate soil health separately for every prediction
        const predictionsWithSoilHealth = predictions.map(
            (prediction) => {
                const soilHealth = calculateSoilHealth(prediction);

                return {
                    ...prediction,
                    soilHealth
                };
            }
        );

        return res.status(200).json({
            success: true,
            predictions: predictionsWithSoilHealth
        });

    } catch (error) {
        console.error("Prediction history error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch prediction history"
        });
    }
};


module.exports = {
    createPrediction,
    getPredictionHistory
};
