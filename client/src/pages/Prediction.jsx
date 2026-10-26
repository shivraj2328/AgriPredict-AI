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

    // Registered farms
    const [farms, setFarms] = useState([]);
    const [selectedFarm, setSelectedFarm] = useState(null);
    const [farmsLoading, setFarmsLoading] = useState(true);
    const [farmError, setFarmError] = useState("");

    // Prediction state
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

    // Load registered farms.
    useEffect(() => {
        let cancelled = false;

        const loadFarms = async () => {
            try {
                setFarmsLoading(true);
                setFarmError("");

                const response = await api.get("/farms");

                if (cancelled) return;

                const farmList = Array.isArray(response.data)
                    ? response.data
                    : response.data.farms;

                if (!Array.isArray(farmList)) {
                    throw new Error(
                        "The server returned an unexpected farms response."
                    );
                }

                setFarms(farmList);
            } catch (err) {
                if (cancelled) return;

                console.error("Failed to load farms:", err);

                setFarmError(
                    err.response?.data?.message ||
                    "Unable to load your registered farms."
                );
            } finally {
                if (!cancelled) {
                    setFarmsLoading(false);
                }
            }
        };

        loadFarms();

        return () => {
            cancelled = true;
        };
    }, []);

    // Open the result modal when a prediction is generated.
    useEffect(() => {
        if (prediction) {
            setShowResultModal(true);
        }
    }, [prediction]);

    // Handle registered farm selection.
    const handleFarmChange = (event) => {
        const farmId = event.target.value;

        const farm = farms.find(
            (item) => item._id === farmId
        ) || null;

        setSelectedFarm(farm);

        // Reset values associated with the previously selected farm.
        setFormData({ ...initialFormData });

        setError("");
        setFarmError("");
        setValidationErrors([]);
    };

    // Generate crop prediction.
    const handlePredict = async (event) => {
        event?.preventDefault();

        setError("");
        setValidationErrors([]);

        if (!selectedFarm?._id) {
            setError("Please select a registered farm first.");
            return;
        }

        for (const key in formData) {
            if (
                formData[key] === "" ||
                formData[key] === null ||
                formData[key] === undefined
            ) {
                setError(
                    "Please fill in all required fields and wait for weather information."
                );
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
                farmId: selectedFarm._id,

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
        } catch (err) {
            console.error("Prediction error:", err);

            const backendErrors = err.response?.data?.errors;

            if (
                Array.isArray(backendErrors) &&
                backendErrors.length > 0
            ) {
                setError(
                    err.response?.data?.message ||
                    "Please correct the invalid prediction values."
                );

                setValidationErrors(backendErrors);
            } else {
                setError(
                    err.response?.data?.message ||
                    "Failed to generate crop prediction."
                );
            }
        } finally {
            setPredictionLoading(false);
        }
    };

    // Reset form values without deselecting the farm.
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

                {/* Page-level errors */}
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

                {farmError && (
                    <div className="alert alert-danger prediction-farm-error">
                        {farmError}
                    </div>
                )}

                {/* Compact registered farm selector */}
                <div className="card shadow-sm border-0 mb-2 prediction-farm-selector">
                    <div className="card-body">
                        <div className="row align-items-center g-2">
                            <div className="col-12 col-md-auto">
                                <label
                                    htmlFor="predictionFarm"
                                    className="form-label fw-semibold mb-0"
                                >
                                    🌾 Select Registered Farm
                                </label>
                            </div>

                            <div className="col-12 col-md">
                                <select
                                    id="predictionFarm"
                                    className="form-select"
                                    value={selectedFarm?._id || ""}
                                    onChange={handleFarmChange}
                                    disabled={
                                        farmsLoading ||
                                        predictionLoading
                                    }
                                >
                                    <option value="">
                                        {farmsLoading
                                            ? "Loading farms..."
                                            : "Choose a farm"}
                                    </option>

                                    {farms.map((farm) => (
                                        <option
                                            key={farm._id}
                                            value={farm._id}
                                        >
                                            {farm.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {!farmsLoading &&
                            farms.length === 0 &&
                            !farmError && (
                                <div className="alert alert-warning mt-2 mb-0 small">
                                    You haven't registered a farm yet.
                                    Visit <strong>My Farms</strong> to register
                                    your farm before predicting a crop.
                                </div>
                            )}
                    </div>
                </div>

                {/* Soil, weather and selected farm map */}
                <PredictionForm
                    formData={formData}
                    setFormData={setFormData}
                    handlePredict={handlePredict}
                    handleReset={handleReset}
                    predictionLoading={predictionLoading}
                    farmsLoading={farmsLoading}
                    hasRegisteredFarms={farms.length > 0}
                    selectedFarm={selectedFarm}
                />

                {/* Prediction result popup */}
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

                {/* Persistent Last Prediction card */}
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
                        <span className="last-prediction-icon">
                            🌱
                        </span>

                        <span className="last-prediction-content">
                            <strong>Last Prediction</strong>

                            <span className="last-prediction-crop">
                                {lastPrediction.crop}
                            </span>

                            <span className="last-prediction-hint">
                                Click to view details
                            </span>
                        </span>

                        <span className="last-prediction-arrow">
                            ↗
                        </span>
                    </button>
                )}
            </div>
        </DashboardLayout>
    );
}

export default Prediction;
