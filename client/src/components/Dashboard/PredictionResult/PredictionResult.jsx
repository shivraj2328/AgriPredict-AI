import ConfidenceMeter from "../ConfidenceMeter/ConfidenceMeter";

import "./PredictionResult.css";

function PredictionResult({ prediction }) {

    if (!prediction) {
        return null;
    }

    return (
        <div className="card prediction-result shadow p-4">

            {/* Result Header */}
            <div className="text-center mb-4">

                <div className="result-icon">
                    🌱
                </div>

                <h3>
                    Prediction Result
                </h3>

                <p className="text-muted mb-0">
                    Based on your soil and weather conditions
                </p>

            </div>

            {/* Recommended Crop */}
            <div className="recommended-crop text-center mb-4">

                <p className="text-muted mb-1">
                    Recommended Crop
                </p>

                <h2 className="text-success mb-0">
                    🌾 {prediction.crop}
                </h2>

            </div>

            {/* Confidence */}
            <div className="mb-4">

                <h5>
                    Confidence
                </h5>

                <ConfidenceMeter
                    value={prediction.confidence}
                />

            </div>

            {/* Reason */}
            <div className="prediction-reason">

                <h5>
                    💡 Why this crop?
                </h5>

                <p className="mb-0">
                    {prediction.reason}
                </p>

            </div>

        </div>
    );
}

export default PredictionResult;