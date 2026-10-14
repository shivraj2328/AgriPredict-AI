import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import PredictionForm from "../components/Dashboard/PredictionForm/PredictionForm";
import PredictionResult from "../components/Dashboard/PredictionResult/PredictionResult";
import api from "../services/api";

import "./../styles/prediction.css";

const user = JSON.parse(localStorage.getItem("user") || "{}");
const LAST_PREDICTION_KEY = `agripredict_last_prediction_${user._id || user.id || "guest"}`;

const initialFormData = {
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    rainfall: "",
    ph: "",
    latitude: "",
    longitude: ""
};

function Prediction() {
    const [formData, setFormData] = useState(initialFormData);

    const [prediction, setPrediction] = useState(null);
    const [lastPrediction, setLastPrediction] = useState(() => {
        try {
            const saved = localStorage.getItem(LAST_PREDICTION_KEY);
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });

    const [showResultModal, setShowResultModal] = useState(false);
    const [predictionLoading, setPredictionLoading] = useState(false);
    const [error, setError] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
        if (prediction) {
            setShowResultModal(true);
        }
    }, [prediction]);

    const handlePredict = async () => {
        setError("");
        setValidationErrors([]);

        for (const key in formData) {
            if (
                formData[key] === "" ||
                formData[key] === null ||
                formData[key] === undefined
            ) {
                setError("Please fill all fields and select your farm location.");
                return;
            }

            if (!Number.isFinite(Number(formData[key]))) {
                setError(`${key} must be numeric.`);
                return;
            }
        }

        try {
            setPredictionLoading(true);

            const response = await api.post("/predictions", {
                nitrogen: Number(formData.nitrogen),
                phosphorus: Number(formData.phosphorus),
                potassium: Number(formData.potassium),
                temperature: Number(formData.temperature),
                humidity: Number(formData.humidity),
                rainfall: Number(formData.rainfall),
                ph: Number(formData.ph),
                latitude: Number(formData.latitude),
                longitude: Number(formData.longitude)
            });

            const result = response.data.prediction;

            const newPrediction = {
                crop: result.recommendedCrop,
                confidence: result.confidence,
                reason:
                    "Based on soil nutrients and weather conditions, this crop was recommended by the AI model.",
                createdAt: new Date().toISOString()
            };

            setPrediction(newPrediction);
            setLastPrediction(newPrediction);

            localStorage.setItem(
                LAST_PREDICTION_KEY,
                JSON.stringify(newPrediction)
            );
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
        } finally {
            setPredictionLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({ ...initialFormData });
        setError("");
        setValidationErrors([]);
    };

    const closeResultModal = () => {
        setShowResultModal(false);
    };

    return (
        <DashboardLayout>
            <div className="container-fluid prediction-page-container">
                {/* <div className="prediction-page-header">
                    <div>
                        <h2>🌱 Crop Prediction</h2>
                        <p>
                            Enter your soil parameters and select your farm location
                            to get an AI-powered crop recommendation.
                        </p>
                    </div>
                </div> */}

                {error && (
                    <div className="alert alert-danger prediction-error">
                        <strong>{error}</strong>

                        {validationErrors.length > 0 && (
                            <ul className="mb-0 mt-2">
                                {validationErrors.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                <PredictionForm
                    formData={formData}
                    setFormData={setFormData}
                    handlePredict={handlePredict}
                    handleReset={handleReset}
                    predictionLoading={predictionLoading}
                />

                {/* Prediction Result Popup */}
                {showResultModal && prediction && (
                    <div
                        className="prediction-modal-backdrop"
                        onMouseDown={(event) => {
                            if (event.target === event.currentTarget) {
                                closeResultModal();
                            }
                        }}
                    >
                        <div
                            className="prediction-modal"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="prediction-modal-title"
                        >
                            <button
                                type="button"
                                className="prediction-modal-close"
                                onClick={closeResultModal}
                                aria-label="Close prediction result"
                            >
                                ×
                            </button>

                            <h3
                                id="prediction-modal-title"
                                className="prediction-modal-heading"
                            >
                                Your Crop Recommendation
                            </h3>

                            <PredictionResult prediction={prediction} />
                        </div>
                    </div>
                )}

                {/* Persistent Last Prediction Card */}
                {lastPrediction && (
                    <button
                        type="button"
                        className="last-prediction-card"
                        onClick={() => {
                            setPrediction(lastPrediction);
                            setShowResultModal(true);
                        }}
                        aria-label="View your last crop prediction"
                    >
                        <span className="last-prediction-icon">🌱</span>

                        <span className="last-prediction-content">
                            <strong>Last Prediction</strong>
                            <span className="last-prediction-crop">
                                {lastPrediction.crop}
                            </span>

                            <span className="last-prediction-hint">
                                Click to view details
                            </span>
                        </span>

                        <span className="last-prediction-arrow">↗</span>
                    </button>
                )}
            </div>
        </DashboardLayout>
    );
}

export default Prediction;