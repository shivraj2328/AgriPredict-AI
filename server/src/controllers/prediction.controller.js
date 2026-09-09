const Prediction = require("../models/prediction.model");
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

        const aiResult = await getCropPrediction({
            nitrogen,
            phosphorus,
            potassium,
            temperature,
            humidity,
            rainfall,
            ph
        });

        const prediction = await Prediction.create({
            user: req.user.userId,
            nitrogen,
            phosphorus,
            potassium,
            temperature,
            humidity,
            rainfall,
            ph,
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