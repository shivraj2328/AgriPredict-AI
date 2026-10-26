import { useState } from "react";

import "./PredictionForm.css";

import api from "../../../services/api";
import FarmLocation from "../FarmLocationPicker/FarmLocationPicker";

import {
    formatTemperature,
    formatRainfall
} from "../../../utils/unitConversion";

function PredictionForm({
    formData,
    setFormData,
    handlePredict,
    handleReset,
    predictionLoading = false,
    farmsLoading = false,
    hasRegisteredFarms = false
}) {
    const [weatherLoading, setWeatherLoading] = useState(false);

    const [settings] = useState(() => {
        try {
            const savedSettings = localStorage.getItem(
                "agripredict_settings"
            );

            return savedSettings
                ? JSON.parse(savedSettings)
                : {
                    temperatureUnit: "C",
                    rainfallUnit: "mm"
                };
        } catch {
            return {
                temperatureUnit: "C",
                rainfallUnit: "mm"
            };
        }
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleLocationSelect = async (location) => {
        setFormData((previous) => ({
            ...previous,
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

            setFormData((previous) => ({
                ...previous,
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
                "Failed to fetch weather data."
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

    const displayedTemperature =
        formData.temperature !== "" &&
        formData.temperature !== null
            ? formatTemperature(
                formData.temperature,
                settings.temperatureUnit
            )
            : "";

    const displayedRainfall =
        formData.rainfall !== "" &&
        formData.rainfall !== null
            ? formatRainfall(
                formData.rainfall,
                settings.rainfallUnit
            )
            : "";

    return (
        <div className="card prediction-form shadow-sm">
            <div className="prediction-form-layout">

                {/* Left Column: Soil and Weather */}
                <div className="prediction-input-column">
                    <h4 className="prediction-section-title">
                        🧪 Soil Parameters
                    </h4>

                    <div className="row">
                        <div className="col-sm-6 mb-3">
                            <label className="form-label">
                                Nitrogen (N)
                            </label>

                            <input
                                type="number"
                                className="form-control"
                                name="nitrogen"
                                value={formData.nitrogen}
                                onChange={handleChange}
                                disabled={predictionLoading}
                            />
                        </div>

                        <div className="col-sm-6 mb-3">
                            <label className="form-label">
                                Phosphorus (P)
                            </label>

                            <input
                                type="number"
                                className="form-control"
                                name="phosphorus"
                                value={formData.phosphorus}
                                onChange={handleChange}
                                disabled={predictionLoading}
                            />
                        </div>

                        <div className="col-sm-6 mb-3">
                            <label className="form-label">
                                Potassium (K)
                            </label>

                            <input
                                type="number"
                                className="form-control"
                                name="potassium"
                                value={formData.potassium}
                                onChange={handleChange}
                                disabled={predictionLoading}
                            />
                        </div>

                        <div className="col-sm-6 mb-3">
                            <label className="form-label">
                                Soil pH
                            </label>

                            <input
                                type="number"
                                step="0.1"
                                className="form-control"
                                name="ph"
                                value={formData.ph}
                                onChange={handleChange}
                                disabled={predictionLoading}
                            />
                        </div>
                    </div>

                    <div className="prediction-weather-section">
                        <h5 className="prediction-section-title">
                            🌦️ Weather Information
                        </h5>

                        {weatherLoading && (
                            <div className="alert alert-info py-2">
                                Fetching weather for your farm...
                            </div>
                        )}

                        {weatherLoaded && !weatherLoading && (
                            <div className="alert alert-success py-2">
                                ✓ Weather data fetched successfully.
                            </div>
                        )}

                        <div className="row">
                            <div className="col-sm-6 mb-3">
                                <label className="form-label">
                                    🌡️ Temperature (°{settings.temperatureUnit})
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={displayedTemperature}
                                    readOnly
                                />
                            </div>

                            <div className="col-sm-6 mb-3">
                                <label className="form-label">
                                    💧 Humidity (%)
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={formData.humidity ?? ""}
                                    readOnly
                                />
                            </div>

                            <div className="col-12 mb-3">
                                <label className="form-label">
                                    🌧️ Rainfall ({settings.rainfallUnit})
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={displayedRainfall}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Farm Map */}
                <div className="prediction-map-column">
                    <h4 className="prediction-section-title">
                        📍 Farm Location
                    </h4>

                    <p className="text-muted small">
                        Search your village or city, then select your farm
                        on the map to fetch its weather information.
                    </p>

                    <FarmLocation
                        onLocationSelect={handleLocationSelect}
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="prediction-form-actions">
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={handlePredict}
                    disabled={
    weatherLoading ||
    predictionLoading ||
    farmsLoading ||
    !hasRegisteredFarms
}
                >
                    {predictionLoading ? (
                        <>
                            <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                            />
                            Analyzing...
                        </>
                    ) : (
                        "🌱 Predict Crop"
                    )}
                </button>

                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleReset}
                    disabled={weatherLoading || predictionLoading}
                >
                    Reset
                </button>
            </div>
        </div>
    );
}

export default PredictionForm;