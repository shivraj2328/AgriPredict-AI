const Prediction = require("../models/Prediction.model");

const {
    calculateSoilHealth
} = require("../services/soilHealth.service");

const getSoilHealth = async (req, res) => {
    try {
        const latestPrediction =
            await Prediction.findOne({
                user: req.user.userId
            }).sort({
                createdAt: -1
            });

        if (!latestPrediction) {
            return res.status(404).json({
                success: false,
                message:
                    "No soil data available yet. Make a crop prediction first."
            });
        }

        const soilHealth =
            calculateSoilHealth(
                latestPrediction
            );

        return res.status(200).json({
            success: true,

            soilHealth: {
                score: soilHealth.score,
                status: soilHealth.status,
                parameters:
                    soilHealth.parameters
            },

            updatedAt:
                latestPrediction.createdAt
        });
    } catch (error) {
        console.error(
            "Soil health controller error:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to calculate indicative soil health"
        });
    }
};

module.exports = {
    getSoilHealth
};