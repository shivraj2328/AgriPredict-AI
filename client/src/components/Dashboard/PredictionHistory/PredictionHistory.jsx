import { useEffect, useState } from "react";
import "./PredictionHistory.css";
import api from "../../../services/api";

function PredictionHistory() {
    const [predictions, setPredictions] = useState([]);
    const [search, setSearch] = useState("");
    const [confidenceFilter, setConfidenceFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedPrediction, setSelectedPrediction] = useState(null);

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

    const filteredPredictions = predictions.filter((prediction) => {
        const cropName =
            prediction.recommendedCrop?.toLowerCase() || "";

        const matchesSearch = cropName.includes(
            search.toLowerCase()
        );

        const confidence = Number(prediction.confidence);

        const matchesConfidence =
            confidenceFilter === "all" ||
            (confidenceFilter === "high" && confidence > 80) ||
            (confidenceFilter === "medium" &&
                confidence >= 50 &&
                confidence <= 80) ||
            (confidenceFilter === "low" && confidence < 50);

        return matchesSearch && matchesConfidence;
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

    const handleViewDetails = (prediction) => {
        if (selectedPrediction?._id === prediction._id) {
            setSelectedPrediction(null);
        } else {
            setSelectedPrediction(prediction);
        }
    };

    return (
        <div className="prediction-history">

            {/* Header */}
            <div className="prediction-history-header">
                <div>
                    <h2>Prediction History</h2>

                    <p>
                        View and search your previous crop predictions.
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="history-filters">

                <div className="search-box">
                    <span className="search-icon">🔍</span>

                    <input
                        type="text"
                        placeholder="Search crop..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

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

            </div>

            {/* Error */}
            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {/* Table */}
            <div className="history-card">

                <div className="table-responsive">

                    <table className="history-table">

                        <thead>
                            <tr>
                                <th>Date</th>
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
                                        colSpan="5"
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
                                                key={
                                                    prediction._id
                                                }
                                            >

                                                <td>
                                                    {formatDate(
                                                        prediction.createdAt
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
                                                            {
                                                                confidence
                                                            }%
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
                                                            ></div>

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
                                        colSpan="5"
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
                                <span>Crop</span>

                                <strong>
                                    {
                                        selectedPrediction.recommendedCrop
                                    }
                                </strong>
                            </div>

                            <div className="detail-item">
                                <span>Confidence</span>

                                <strong>
                                    {Number(
                                        selectedPrediction.confidence
                                    ).toFixed(2)}
                                    %
                                </strong>
                            </div>

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
                                    {selectedPrediction.temperature ?? "N/A"}
                                    {selectedPrediction.temperature != null
                                        ? " °C"
                                        : ""}
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
                                    {selectedPrediction.rainfall ?? "N/A"}
                                    {selectedPrediction.rainfall != null
                                        ? " mm"
                                        : ""}
                                </strong>
                            </div>

                        </div>

                    </div>

                </div>
            )}

            {/* Result count */}
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