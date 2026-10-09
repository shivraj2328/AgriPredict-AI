const Prediction = require("../models/Prediction.model");

const getUserPredictionStatistics = async (userId) => {
    const predictions = await Prediction.find({
        user: userId
    }).sort({
        createdAt: -1
    });

    return predictions;
};

module.exports = {
    getUserPredictionStatistics
};