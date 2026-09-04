const Prediction = require("../models/Prediction.model");

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

        const inputs = {
            nitrogen,
            phosphorus,
            potassium,
            temperature,
            humidity,
            rainfall,
            ph
        };

        for (const [key, value] of Object.entries(inputs)) {
            if (value === undefined || value === null || value === "") {
                return res.status(400).json({
                    success: false,
                    message: `${key} is required`
                });
            }

            if (!Number.isFinite(Number(value))) {
                return res.status(400).json({
                    success: false,
                    message: `${key} must be a valid number`
                });
            }
        }

        const prediction = await Prediction.create({
            user: req.user.userId,
            nitrogen: Number(nitrogen),
            phosphorus: Number(phosphorus),
            potassium: Number(potassium),
            temperature: Number(temperature),
            humidity: Number(humidity),
            rainfall: Number(rainfall),
            ph: Number(ph),
            recommendedCrop: "Pending",
            confidence: 0
        });

        return res.status(201).json({
            success: true,
            message: "Prediction created successfully",
            prediction
        });
    } catch (error) {
        console.error("Create prediction error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create prediction"
        });
    }
};

module.exports = {
    createPrediction
};