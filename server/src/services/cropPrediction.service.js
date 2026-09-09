const {
    loadModel,
    predictCrop
} = require("../ai/cropPrediction");

const getCropPrediction = async (input) => {
    await loadModel();

    return await predictCrop({
        N: input.nitrogen,
        P: input.phosphorus,
        K: input.potassium,
        temperature: input.temperature,
        humidity: input.humidity,
        rainfall: input.rainfall,
        ph: input.ph
    });
};

module.exports = {
    getCropPrediction
};