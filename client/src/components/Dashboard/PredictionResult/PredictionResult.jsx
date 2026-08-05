import ConfidenceMeter from "../ConfidenceMeter/ConfidenceMeter";

import "./PredictionResult.css";

function PredictionResult({ prediction }) {

    if (!prediction) {

        return null;

    }

    return (

        <div className="card prediction-result shadow p-4">

            <h3 className="mb-4">

                Prediction Result

            </h3>

            <div className="mb-3">

                <h5>

                    Recommended Crop

                </h5>

                <h2 className="text-success">

                    🌾 {prediction.crop}

                </h2>

            </div>

            <ConfidenceMeter

                value={prediction.confidence}

            />

            <div className="mt-4">

                <h5>

                    Reason

                </h5>

                <p>

                    {prediction.reason}

                </p>

            </div>

        </div>

    );

}

export default PredictionResult;