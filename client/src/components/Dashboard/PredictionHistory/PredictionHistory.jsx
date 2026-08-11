import { useState } from "react";
import "./PredictionHistory.css";

const predictions = [
    {
        id: 1,
        date: "10 Aug 2026",
        crop: "Rice",
        confidence: 96,
        status: "Successful",
    },
    {
        id: 2,
        date: "08 Aug 2026",
        crop: "Cotton",
        confidence: 91,
        status: "Successful",
    },
    {
        id: 3,
        date: "05 Aug 2026",
        crop: "Wheat",
        confidence: 94,
        status: "Successful",
    },
    {
        id: 4,
        date: "02 Aug 2026",
        crop: "Maize",
        confidence: 88,
        status: "Successful",
    },
    {
        id: 5,
        date: "30 Jul 2026",
        crop: "Sugarcane",
        confidence: 76,
        status: "Successful",
    },
    {
        id: 6,
        date: "27 Jul 2026",
        crop: "Groundnut",
        confidence: 63,
        status: "Successful",
    },
];

function PredictionHistory() {
    const [search, setSearch] = useState("");
    const [confidenceFilter, setConfidenceFilter] = useState("all");

    const filteredPredictions = predictions.filter((prediction) => {
        const matchesSearch = prediction.crop
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesConfidence =
            confidenceFilter === "all" ||
            (confidenceFilter === "high" && prediction.confidence > 80) ||
            (confidenceFilter === "medium" &&
                prediction.confidence >= 50 &&
                prediction.confidence <= 80) ||
            (confidenceFilter === "low" && prediction.confidence < 50);

        return matchesSearch && matchesConfidence;
    });

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
                    onChange={(e) => setConfidenceFilter(e.target.value)}
                >
                    <option value="all">All Confidence</option>
                    <option value="high">High (&gt;80%)</option>
                    <option value="medium">Medium (50–80%)</option>
                    <option value="low">Low (&lt;50%)</option>
                </select>
            </div>

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
                            </tr>
                        </thead>

                        <tbody>
                            {filteredPredictions.length > 0 ? (
                                filteredPredictions.map((prediction) => (
                                    <tr key={prediction.id}>
                                        <td>{prediction.date}</td>

                                        <td>
                                            <span className="crop-name">
                                                {prediction.crop}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="confidence-cell">
                                                <span>
                                                    {prediction.confidence}%
                                                </span>

                                                <div className="confidence-bar">
                                                    <div
                                                        className="confidence-progress"
                                                        style={{
                                                            width: `${prediction.confidence}%`,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <span className="status-badge">
                                                ✓ {prediction.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
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

            {/* Result count */}
            <p className="result-count">
                Showing {filteredPredictions.length} of{" "}
                {predictions.length} predictions
            </p>
        </div>
    );
}

export default PredictionHistory;