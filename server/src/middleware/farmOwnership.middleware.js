const mongoose = require("mongoose");
const Farm = require("../models/Farm.model");

const farmOwnershipMiddleware = async (req, res, next) => {
    try {
        const { farmId } = req.params;

        // Validate the farm ID format
        if (!mongoose.isValidObjectId(farmId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid farm ID"
            });
        }

        // Find the farm belonging to the logged-in user
        const farm = await Farm.findOne({
            _id: farmId,
            user: req.user.userId
        });

        // Do not reveal whether another user's farm exists
        if (!farm) {
            return res.status(404).json({
                success: false,
                message: "Farm not found"
            });
        }

        // Make the verified farm available to the next handler
        req.farm = farm;

        next();
    } catch (error) {
        console.error(
            "Farm ownership validation error:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message: "Failed to validate farm ownership"
        });
    }
};

module.exports = farmOwnershipMiddleware;