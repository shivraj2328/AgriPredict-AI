import { useState } from "react";
import "./PredictionForm.css";
import api from "../../../services/api";
import FarmLocation from "../FarmLocationPicker/FarmLocationPicker";

function PredictionForm({
    formData,
    setFormData,
    handlePredict,
    handleReset,
    predictionLoading = false
}) {
    const [weatherLoading, setWeatherLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleLocationSelect = async (location) => {
        setFormData((prev) => ({
            ...prev,
            latitude: location.latitude,
            longitude: location.longitude,
            temperature: "",
            humidity: "",
            rainfall: ""
        }));

        try {
            setWeatherLoading(true);

            const response = await api.post("/weather", {
                latitude: location.latitude,
                longitude: location.longitude
            });

            setFormData((prev) => ({
                ...prev,
                latitude: location.latitude,
                longitude: location.longitude,
                temperature: response.data.temperature,
                humidity: response.data.humidity,
                rainfall: response.data.rainfall
            }));

        } catch (error) {
            console.error("Weather fetch error:", error);

            alert(
                error.response?.data?.message ||
                "Failed to fetch weather data"
            );

        } finally {
            setWeatherLoading(false);
        }
    };

    const weatherLoaded =
        formData.temperature !== "" &&
        formData.temperature !== null &&
        formData.humidity !== "" &&
        formData.humidity !== null &&
        formData.rainfall !== "" &&
        formData.rainfall !== null;

    return (
        <div className="card prediction-form shadow p-4">

            <h4 className="mb-4">
                Soil Parameters
            </h4>

            <div className="row">

                {/* Nitrogen */}
                <div className="col-md-6 mb-3">
                    <label className="form-label">
                        Nitrogen (N)
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        name="nitrogen"
                        value={formData.nitrogen || ""}
                        onChange={handleChange}
                        disabled={predictionLoading}
                    />
                </div>

                {/* Phosphorus */}
                <div className="col-md-6 mb-3">
                    <label className="form-label">
                        Phosphorus (P)
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        name="phosphorus"
                        value={formData.phosphorus || ""}
                        onChange={handleChange}
                        disabled={predictionLoading}
                    />
                </div>

                {/* Potassium */}
                <div className="col-md-6 mb-3">
                    <label className="form-label">
                        Potassium (K)
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        name="potassium"
                        value={formData.potassium || ""}
                        onChange={handleChange}
                        disabled={predictionLoading}
                    />
                </div>

                {/* Soil pH */}
                <div className="col-md-6 mb-4">
                    <label className="form-label">
                        Soil pH
                    </label>

                    <input
                        type="number"
                        step="0.1"
                        className="form-control"
                        name="ph"
                        value={formData.ph || ""}
                        onChange={handleChange}
                        disabled={predictionLoading}
                    />
                </div>

            </div>

            {/* Weather Information */}
            <div className="weather-section mb-4">

                <h5 className="mb-3">
                    🌦️ Weather Information
                </h5>

                {weatherLoading && (
                    <div className="alert alert-info">
                        🌦️ Fetching weather for your farm...
                    </div>
                )}

                {weatherLoaded && !weatherLoading && (
                    <div className="alert alert-success">
                        ✓ Weather data fetched for your selected farm.
                    </div>
                )}

                <div className="row">

                    {/* Temperature */}
                    <div className="col-md-4 mb-3">
                        <label className="form-label">
                            🌡️ Temperature (°C)
                        </label>

                        <input
                            type="number"
                            className="form-control"
                            name="temperature"
                            value={formData.temperature || ""}
                            readOnly
                        />
                    </div>

                    {/* Humidity */}
                    <div className="col-md-4 mb-3">
                        <label className="form-label">
                            💧 Humidity (%)
                        </label>

                        <input
                            type="number"
                            className="form-control"
                            name="humidity"
                            value={formData.humidity || ""}
                            readOnly
                        />
                    </div>

                    {/* Rainfall */}
                    <div className="col-md-4 mb-3">
                        <label className="form-label">
                            🌧️ Rainfall (mm)
                        </label>

                        <input
                            type="number"
                            className="form-control"
                            name="rainfall"
                            value={formData.rainfall || ""}
                            readOnly
                        />
                    </div>

                </div>

            </div>

            {/* Farm Location */}
            <div className="row px-2">

                <FarmLocation
                    onLocationSelect={handleLocationSelect}
                />

            </div>

            {/* Prediction Loading */}
            {predictionLoading && (
                <div className="alert alert-success mt-2">
                    🤖 Analyzing your farm data...
                </div>
            )}

            {/* Action Buttons */}
            <div className="d-flex gap-3 mt-2">

                <button
                    type="button"
                    className="btn btn-success"
                    onClick={handlePredict}
                    disabled={
                        weatherLoading ||
                        predictionLoading
                    }
                >
                    {predictionLoading ? (
                        <>
                            <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                            ></span>

                            Analyzing...
                        </>
                    ) : (
                        "Predict Crop"
                    )}
                </button>

                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleReset}
                    disabled={
                        weatherLoading ||
                        predictionLoading
                    }
                >
                    Reset
                </button>

            </div>

        </div>
    );
}

export default PredictionForm;