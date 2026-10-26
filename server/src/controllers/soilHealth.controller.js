const mongoose = require("mongoose");

const Prediction = require("../models/Prediction.model");
const Farm = require("../models/Farm.model");

const {
    calculateSoilHealth
} = require("../services/soilHealth.service");

const getSoilHealth = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const farmId = req.query.farmId;

        // Verify authentication
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        // A farm must be selected
        if (!farmId) {
            return res.status(400).json({
                success: false,
                message: "Please select a farm"
            });
        }

        // Validate farm ID format
        if (!mongoose.Types.ObjectId.isValid(farmId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid farm ID"
            });
        }

        // Verify that the farm belongs to the logged-in user
        const farm = await Farm.findOne({
            _id: farmId,
            user: userId
        });

        if (!farm) {
            return res.status(404).json({
                success: false,
                message: "Farm not found"
            });
        }

        // Find the latest prediction associated with this farm
        const latestPrediction = await Prediction.findOne({
            user: userId,
            farm: farm._id
        }).sort({
            createdAt: -1
        });

        if (!latestPrediction) {
            return res.status(404).json({
                success: false,
                message:
                    "No soil data available for this farm. Make a crop prediction for this farm first."
            });
        }

        // Calculate soil health using this farm's prediction
        const soilHealth = calculateSoilHealth(
            latestPrediction
        );

        return res.status(200).json({
            success: true,

            farm: {
                id: farm._id,
                name: farm.name,
                latitude: farm.latitude,
                longitude: farm.longitude
            },

            soilHealth: {
                score: soilHealth.score,
                status: soilHealth.status,
                parameters: soilHealth.parameters
            },

            updatedAt: latestPrediction.createdAt
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
