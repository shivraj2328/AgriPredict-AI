const {
    loadModel,
    predictCrop
} = require("../ai/cropPrediction");


const getCropPrediction = async (input) => {

    try {

        await loadModel();

        const result = await predictCrop({
            N: input.nitrogen,
            P: input.phosphorus,
            K: input.potassium,
            temperature: input.temperature,
            humidity: input.humidity,
            rainfall: input.rainfall,
            ph: input.ph
        });


        // ------------------------------------------
        // Validate AI result
        // ------------------------------------------

        if (
            !result ||
            typeof result.crop !== "string" ||
            !result.crop.trim() ||
            !Number.isFinite(Number(result.confidence))
        ) {
            throw new Error(
                "Invalid AI prediction result"
            );
        }


        return {
            crop: result.crop,
            confidence: Number(result.confidence)
        };

    } catch (error) {

        console.error(
            "AI prediction service error:",
            error.message
        );


        const aiError = new Error(
            "AI prediction service unavailable"
        );

        aiError.code = "AI_PREDICTION_ERROR";

        throw aiError;
    }
};


module.exports = {
    getCropPrediction
};