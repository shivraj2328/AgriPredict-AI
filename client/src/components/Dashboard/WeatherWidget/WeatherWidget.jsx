import { useEffect, useState } from "react";
import api from "../../../services/api";
import {
    formatTemperature,
    formatRainfall
} from "../../../utils/unitConversion";

function WeatherWidget({ latitude, longitude }) {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [settings] = useState(() => {
        const savedSettings = localStorage.getItem(
            "agripredict_settings"
        );

        return savedSettings
            ? JSON.parse(savedSettings)
            : {
                temperatureUnit: "C",
                rainfallUnit: "mm"
            };
    });

    useEffect(() => {
        const fetchWeather = async () => {
            if (
                latitude === undefined ||
                latitude === null ||
                longitude === undefined ||
                longitude === null
            ) {
                setWeather(null);
                return;
            }

            try {
                setLoading(true);
                setError("");

                const response = await api.post("/weather", {
                    latitude,
                    longitude
                });

                setWeather({
                    temperature: response.data.temperature,
                    humidity: response.data.humidity,
                    rainfall: response.data.rainfall
                });
            } catch (error) {
                console.error("Dashboard weather error:", error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load weather data."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [latitude, longitude]);

    return (
        <div className="card dashboard-weather-card h-100">
            <div className="card-body">
                <div className="dashboard-weather-header">
                    <div>
                        <span className="dashboard-weather-eyebrow">
                            LIVE CONDITIONS
                        </span>
                        <h4>Current Weather</h4>
                    </div>

                    <span className="dashboard-weather-icon">
                        🌤️
                    </span>
                </div>

                {loading && (
                    <div className="dashboard-weather-state">
                        <div className="dashboard-weather-spinner" />
                        <p>Fetching latest weather...</p>
                    </div>
                )}

                {!loading && error && (
                    <div className="dashboard-weather-error">
                        {error}
                    </div>
                )}

                {!loading && !error && weather && (
                    <div className="dashboard-weather-content">
                        <div className="dashboard-weather-main">
                            <h1>
                                {formatTemperature(
                                    weather.temperature,
                                    settings.temperatureUnit
                                )}
                            </h1>

                            <span>Current temperature</span>
                        </div>

                        <div className="dashboard-weather-metrics">
                            <div className="dashboard-weather-metric">
                                <span className="weather-metric-icon">
                                    💧
                                </span>
                                <div>
                                    <span>Humidity</span>
                                    <strong>{weather.humidity}%</strong>
                                </div>
                            </div>

                            <div className="dashboard-weather-metric">
                                <span className="weather-metric-icon">
                                    🌧️
                                </span>
                                <div>
                                    <span>Rainfall</span>
                                    <strong>
                                        {formatRainfall(
                                            weather.rainfall,
                                            settings.rainfallUnit
                                        )}
                                    </strong>
                                </div>
                            </div>
                        </div>

                        <div className="dashboard-weather-footer">
                            <span className="weather-live-dot" />
                            Live weather data
                        </div>
                    </div>
                )}

                {!loading && !error && !weather && (
                    <div className="dashboard-weather-empty">
                        <span>📍</span>
                        <p>No farm location available.</p>
                        <small>Add a farm location to view weather.</small>
                    </div>
                )}
            </div>
        </div>
    );
}

export default WeatherWidget;