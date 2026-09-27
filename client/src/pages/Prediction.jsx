import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import PredictionForm from "../components/Dashboard/PredictionForm/PredictionForm";
import PredictionResult from "../components/Dashboard/PredictionResult/PredictionResult";
import api from "../services/api";

function Prediction() {

    const [formData, setFormData] = useState({
        nitrogen: "",
        phosphorus: "",
        potassium: "",
        temperature: "",
        humidity: "",
        rainfall: "",
        ph: ""
    });

    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);

    const handlePredict = async () => {

        setError("");
        setValidationErrors([]);
        setPrediction(null);

        for (const key in formData) {

            if (formData[key] === "") {
                setError("Please fill all fields.");
                return;
            }
        }

        for (const key in formData) {

            if (isNaN(formData[key])) {
                setError(`${key} must be numeric.`);
                return;
            }
        }

        try {

            const response = await api.post("/predictions", {
                nitrogen: Number(formData.nitrogen),
                phosphorus: Number(formData.phosphorus),
                potassium: Number(formData.potassium),
                temperature: Number(formData.temperature),
                humidity: Number(formData.humidity),
                rainfall: Number(formData.rainfall),
                ph: Number(formData.ph)
            });

            const result = response.data.prediction;

            setPrediction({
                crop: result.recommendedCrop,
                confidence: result.confidence,
                reason:
                    "Based on soil nutrients and weather conditions, this crop was recommended by the AI model."
            });

        } catch (error) {

            console.error("Prediction error:", error);

            const backendErrors = error.response?.data?.errors;

            if (Array.isArray(backendErrors) && backendErrors.length > 0) {
                setError(
                    error.response?.data?.message ||
                    "Please correct the invalid prediction values."
                );

                setValidationErrors(backendErrors);
            } else {
                setError(
                    error.response?.data?.message ||
                    "Failed to generate crop prediction."
                );
            }
        }
    };

    const handleReset = () => {

        setFormData({
            nitrogen: "",
            phosphorus: "",
            potassium: "",
            temperature: "",
            humidity: "",
            rainfall: "",
            ph: ""
        });

        setPrediction(null);
        setError("");
        setValidationErrors([]);
    };

    return (

        <DashboardLayout>

            <div className="container-fluid p-4">

                <h2 className="mb-4">
                    🌱 Crop Prediction
                </h2>

                {error && (
                    <div className="alert alert-danger">

                        <div>
                            <strong>{error}</strong>
                        </div>

                        {validationErrors.length > 0 && (
                            <ul className="mb-0 mt-2">
                                {validationErrors.map((validationError, index) => (
                                    <li key={index}>
                                        {validationError}
                                    </li>
                                ))}
                            </ul>
                        )}

                    </div>
                )}

                <div className="row">

                    <div className="col-lg-7">

                        <PredictionForm
                            formData={formData}
                            setFormData={setFormData}
                            handlePredict={handlePredict}
                            handleReset={handleReset}
                        />

                    </div>

                    <div className="col-lg-5">

                        <PredictionResult
                            prediction={prediction}
                        />

                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
}

export default Prediction;