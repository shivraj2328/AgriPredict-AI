const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        nitrogen: {
            type: Number,
            required: true,
            min: 0
        },

        phosphorus: {
            type: Number,
            required: true,
            min: 0
        },

        potassium: {
            type: Number,
            required: true,
            min: 0
        },

        temperature: {
            type: Number,
            required: true
        },

        humidity: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },

        rainfall: {
            type: Number,
            required: true,
            min: 0
        },

        ph: {
            type: Number,
            required: true,
            min: 0,
            max: 14
        },

        latitude: {
            type: Number,
            required: true,
            min: -90,
            max: 90
        },

        longitude: {
            type: Number,
            required: true,
            min: -180,
            max: 180
        },

        recommendedCrop: {
            type: String,
            required: true,
            trim: true
        },

        confidence: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        }
    },
    {
        timestamps: true
    }
);

const Prediction = mongoose.model(
    "Prediction",
    predictionSchema
);

module.exports = Prediction;