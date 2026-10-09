const Prediction = require("../models/Prediction.model");

const getUserPredictionStatistics = async (userId) => {
    const predictions = await Prediction.find({
        user: userId
    });

    const totalPredictions = predictions.length;

    const successfulPredictions = predictions.filter(
        (prediction) =>
            typeof prediction.recommendedCrop === "string" &&
            prediction.recommendedCrop.trim() !== ""
    ).length;

    const averageConfidence =
        totalPredictions > 0
            ? predictions.reduce(
                  (total, prediction) =>
                      total +
                      Number(prediction.confidence || 0),
                  0
              ) / totalPredictions
            : 0;

    const cropCounts = {};

    predictions.forEach((prediction) => {
        const crop = prediction.recommendedCrop?.trim();

        if (crop) {
            cropCounts[crop] =
                (cropCounts[crop] || 0) + 1;
        }
    });

    let mostRecommendedCrop = null;

    Object.entries(cropCounts).forEach(
        ([crop, count]) => {
            if (
                !mostRecommendedCrop ||
                count >
                    cropCounts[mostRecommendedCrop]
            ) {
                mostRecommendedCrop = crop;
            }
        }
    );

    return {
        totalPredictions,
        successfulPredictions,
        averageConfidence: Number(
            averageConfidence.toFixed(2)
        ),
        mostRecommendedCrop
    };
};

module.exports = {
    getUserPredictionStatistics
};