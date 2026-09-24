const Prediction = require("../models/Prediction.model");
const {
    getCropPrediction
} = require("../services/cropPrediction.service");

const createPrediction = async (req, res) => {
    try {
        const {
            nitrogen,
            phosphorus,
            potassium,
            temperature,
            humidity,
            rainfall,
            ph
        } = req.body;

        const values = {
            nitrogen,
            phosphorus,
            potassium,
            temperature,
            humidity,
            rainfall,
            ph
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
                message: "All 7 prediction features are required"
            });
        }

        const aiResult = await getCropPrediction({
            nitrogen: Number(nitrogen),
            phosphorus: Number(phosphorus),
            potassium: Number(potassium),
            temperature: Number(temperature),
            humidity: Number(humidity),
            rainfall: Number(rainfall),
            ph: Number(ph)
        });

        const prediction = await Prediction.create({
            user: req.user.userId,
            nitrogen: Number(nitrogen),
            phosphorus: Number(phosphorus),
            potassium: Number(potassium),
            temperature: Number(temperature),
            humidity: Number(humidity),
            rainfall: Number(rainfall),
            ph: Number(ph),
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

        return res.status(500).json({
            success: false,
            message: "Failed to generate and save crop prediction"
        });
    }
};

module.exports = {
    createPrediction
};