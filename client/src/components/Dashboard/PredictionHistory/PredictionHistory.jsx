import { useEffect, useState } from "react";
import "./PredictionHistory.css";
import api from "../../../services/api";
import {
    formatTemperature,
    formatRainfall
} from "../../../utils/unitConversion";

function PredictionHistory() {
    const [predictions, setPredictions] = useState([]);
    const [farms, setFarms] = useState([]);

    const [search, setSearch] = useState("");
    const [confidenceFilter, setConfidenceFilter] = useState("all");
    const [selectedFarm, setSelectedFarm] = useState("all");

    const [loading, setLoading] = useState(true);
    const [farmsLoading, setFarmsLoading] = useState(true);
    const [error, setError] = useState("");
    const [farmsError, setFarmsError] = useState("");
    const [selectedPrediction, setSelectedPrediction] = useState(null);

    const [settings] = useState(() => {
        const savedSettings = localStorage.getItem(
            "agripredict_settings"
        );

        return savedSettings
            ? JSON.parse(savedSettings)
            : {
                temperatureUnit: "C",
                rainfallUnit: "mm",
                showConfidenceScore: true
            };
    });

    // Fetch prediction history
    useEffect(() => {
        const fetchPredictionHistory = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get("/predictions");

                setPredictions(response.data.predictions || []);
            } catch (error) {
                console.error(
                    "Prediction history error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load prediction history."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchPredictionHistory();
    }, []);

    // Fetch farms belonging to the logged-in user
    useEffect(() => {
        const fetchFarms = async () => {
            try {
                setFarmsLoading(true);
                setFarmsError("");

                const response = await api.get("/farms");

                // Supports either { farms: [...] } or a direct array.
                const farmsData = Array.isArray(response.data)
                    ? response.data
                    : response.data.farms;

                setFarms(
                    Array.isArray(farmsData) ? farmsData : []
                );
            } catch (error) {
                console.error("Failed to load farms:", error);

                setFarmsError(
                    error.response?.data?.message ||
                    "Unable to load your farms."
                );
            } finally {
                setFarmsLoading(false);
            }
        };

        fetchFarms();
    }, []);

    // Apply crop search, confidence filter, and farm filter
    const filteredPredictions = predictions.filter((prediction) => {
        const cropName =
            prediction.recommendedCrop?.toLowerCase() || "";

        const matchesSearch = cropName.includes(
            search.toLowerCase().trim()
        );

        const confidence = Number(prediction.confidence);

        const matchesConfidence =
            confidenceFilter === "all" ||
            (confidenceFilter === "high" && confidence > 80) ||
            (confidenceFilter === "medium" &&
                confidence >= 50 &&
                confidence <= 80) ||
            (confidenceFilter === "low" && confidence < 50);

        // Populated farm objects and unpopulated farm IDs are supported.
        const predictionFarmId =
            typeof prediction.farm === "object"
                ? prediction.farm?._id
                : prediction.farm;

        const matchesFarm =
            selectedFarm === "all" ||
            String(predictionFarmId || "") ===
                String(selectedFarm);

        return (
            matchesSearch &&
            matchesConfidence &&
            matchesFarm
        );
    });

    const formatDate = (date) => {
        if (!date) {
            return "N/A";
        }

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const getFarmName = (prediction) => {
        if (
            prediction.farm &&
            typeof prediction.farm === "object" &&
            prediction.farm.name
        ) {
            return prediction.farm.name;
        }

        return "Farm not associated";
    };

    const handleViewDetails = (prediction) => {
        if (selectedPrediction?._id === prediction._id) {
            setSelectedPrediction(null);
        } else {
            setSelectedPrediction(prediction);
        }
    };

    return (
        <div className="prediction-history">

            {/* Filters */}
            <div className="history-filters">

                {/* Crop Search */}
                <div className="search-box">
                    <span className="search-icon">🔍</span>

                    <input
                        type="text"
                        placeholder="Search crop..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Confidence Filter */}
                <select
                    className="confidence-filter"
                    value={confidenceFilter}
                    onChange={(e) =>
                        setConfidenceFilter(e.target.value)
                    }
                >
                    <option value="all">
                        All Confidence
                    </option>

                    <option value="high">
                        High (&gt;80%)
                    </option>

                    <option value="medium">
                        Medium (50–80%)
                    </option>

                    <option value="low">
                        Low (&lt;50%)
                    </option>
                </select>

                {/* Farm Filter */}
                <select
                    className="confidence-filter"
                    value={selectedFarm}
                    onChange={(e) =>
                        setSelectedFarm(e.target.value)
                    }
                    disabled={farmsLoading}
                    aria-label="Filter predictions by farm"
                >
                    <option value="all">
                        {farmsLoading
                            ? "Loading farms..."
                            : "All Farms"}
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

            {/* Farm Loading Error */}
            {farmsError && (
                <div className="alert alert-danger">
                    {farmsError}
                </div>
            )}

            {/* Prediction Error */}
            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {/* Prediction History Table */}
            <div className="history-card">
                <div className="table-responsive">

                    <table className="history-table">

                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Farm</th>
                                <th>Crop</th>
                                <th>Confidence</th>
                                <th>Status</th>
                                <th>Details</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="no-results"
                                    >
                                        Loading predictions...
                                    </td>
                                </tr>
                            ) : filteredPredictions.length > 0 ? (
                                filteredPredictions.map(
                                    (prediction) => {
                                        const confidence =
                                            Number(
                                                prediction.confidence
                                            );

                                        const isSelected =
                                            selectedPrediction?._id ===
                                            prediction._id;

                                        return (
                                            <tr
                                                key={prediction._id}
                                            >
                                                <td>
                                                    {formatDate(
                                                        prediction.createdAt
                                                    )}
                                                </td>

                                                <td>
                                                    {getFarmName(
                                                        prediction
                                                    )}
                                                </td>

                                                <td>
                                                    <span className="crop-name">
                                                        {
                                                            prediction.recommendedCrop
                                                        }
                                                    </span>
                                                </td>

                                                <td>
                                                    <div className="confidence-cell">
                                                        <span>
                                                            {confidence}%
                                                        </span>

                                                        <div className="confidence-bar">
                                                            <div
                                                                className="confidence-progress"
                                                                style={{
                                                                    width: `${Math.min(
                                                                        Math.max(
                                                                            confidence,
                                                                            0
                                                                        ),
                                                                        100
                                                                    )}%`
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>

                                                <td>
                                                    <span className="status-badge">
                                                        ✓ Successful
                                                    </span>
                                                </td>

                                                <td>
                                                    <button
                                                        type="button"
                                                        className="details-button"
                                                        onClick={() =>
                                                            handleViewDetails(
                                                                prediction
                                                            )
                                                        }
                                                    >
                                                        {isSelected
                                                            ? "Hide"
                                                            : "View"}
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="no-results"
                                    >
                                        No predictions found.
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>

            {/* Prediction Details */}
            {selectedPrediction && (
                <div className="prediction-details">

                    <div className="prediction-details-header">
                        <div>
                            <h4>Prediction Details</h4>

                            <p>
                                {formatDate(
                                    selectedPrediction.createdAt
                                )}
                            </p>
                        </div>

                        <button
                            type="button"
                            className="details-close"
                            onClick={() =>
                                setSelectedPrediction(null)
                            }
                        >
                            ×
                        </button>
                    </div>

                    {/* Prediction Result */}
                    <div className="details-section">
                        <h5>🌱 Prediction Result</h5>

                        <div className="details-grid">

                            <div className="detail-item">
                                <span>Farm</span>

                                <strong>
                                    {getFarmName(
                                        selectedPrediction
                                    )}
                                </strong>
                            </div>

                            <div className="detail-item">
                                <span>Crop</span>

                                <strong>
                                    {
                                        selectedPrediction.recommendedCrop
                                    }
                                </strong>
                            </div>

                            {settings.showConfidenceScore && (
                                <div className="detail-item">
                                    <span>Confidence</span>

                                    <strong>
                                        {Number(
                                            selectedPrediction.confidence
                                        ).toFixed(2)}
                                        %
                                    </strong>
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Soil Parameters */}
                    <div className="details-section">
                        <h5>🧪 Soil Parameters</h5>

                        <div className="details-grid">

                            <div className="detail-item">
                                <span>Nitrogen (N)</span>

                                <strong>
                                    {selectedPrediction.nitrogen ?? "N/A"}
                                </strong>
                            </div>

                            <div className="detail-item">
                                <span>Phosphorus (P)</span>

                                <strong>
                                    {selectedPrediction.phosphorus ?? "N/A"}
                                </strong>
                            </div>

                            <div className="detail-item">
                                <span>Potassium (K)</span>

                                <strong>
                                    {selectedPrediction.potassium ?? "N/A"}
                                </strong>
                            </div>

                            <div className="detail-item">
                                <span>Soil pH</span>

                                <strong>
                                    {selectedPrediction.ph ?? "N/A"}
                                </strong>
                            </div>

                        </div>
                    </div>

                    {/* Weather Parameters */}
                    <div className="details-section">
                        <h5>🌦️ Weather Parameters</h5>

                        <div className="details-grid">

                            <div className="detail-item">
                                <span>Temperature</span>

                                <strong>
                                    {selectedPrediction.temperature != null
                                        ? formatTemperature(
                                            selectedPrediction.temperature,
                                            settings.temperatureUnit
                                        )
                                        : "N/A"}
                                </strong>
                            </div>

                            <div className="detail-item">
                                <span>Humidity</span>

                                <strong>
                                    {selectedPrediction.humidity ?? "N/A"}
                                    {selectedPrediction.humidity != null
                                        ? " %"
                                        : ""}
                                </strong>
                            </div>

                            <div className="detail-item">
                                <span>Rainfall</span>

                                <strong>
                                    {selectedPrediction.rainfall != null
                                        ? formatRainfall(
                                            selectedPrediction.rainfall,
                                            settings.rainfallUnit
                                        )
                                        : "N/A"}
                                </strong>
                            </div>

                        </div>
                    </div>

                </div>
            )}

            {/* Result Count */}
            {!loading && (
                <p className="result-count">
                    Showing {filteredPredictions.length} of{" "}
                    {predictions.length} predictions
                </p>
            )}

        </div>
    );
}

export default PredictionHistory;
