import { useEffect, useState } from "react";
import api from "../../../services/api";

function WeatherWidget({ latitude, longitude }) {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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
                console.error(
                    "Dashboard weather error:",
                    error
                );

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
        <div className="card shadow-sm h-100">
            <div className="card-body">

                <h4>Current Weather</h4>

                {loading && (
                    <p className="text-muted mt-3">
                        Loading weather...
                    </p>
                )}

                {!loading && error && (
                    <div className="alert alert-danger mt-3 mb-0">
                        {error}
                    </div>
                )}

                {!loading && !error && weather && (
                    <div className="mt-3">
                        <h1>{weather.temperature}°C</h1>

                        <p>
                            Humidity: {weather.humidity}%
                        </p>

                        <p>
                            Rainfall: {weather.rainfall} mm
                        </p>

                        <p className="mb-0">
                            🌤️ Current conditions
                        </p>
                    </div>
                )}

                {!loading && !error && !weather && (
                    <p className="text-muted mt-3 mb-0">
                        No farm location available.
                    </p>
                )}

            </div>
        </div>
    );
}

export default WeatherWidget;