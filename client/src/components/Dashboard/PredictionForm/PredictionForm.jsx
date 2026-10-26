import { useEffect, useRef, useState } from "react";

import api from "../../../services/api";
import FarmLocation from "../FarmLocationPicker/FarmLocationPicker";

const PredictionForm = ({
    formData,
    setFormData,
    handlePredict,
    handleReset,
    predictionLoading,
    farmsLoading,
    hasRegisteredFarms,
    selectedFarm
}) => {
    const [weatherLoading, setWeatherLoading] = useState(false);
    const [weatherError, setWeatherError] = useState("");
    const [weatherLoaded, setWeatherLoaded] = useState(false);

    const weatherRequestId = useRef(0);

    const fetchWeatherForLocation = async (location) => {
        const latitude = Number(location?.latitude);
        const longitude = Number(location?.longitude);

        if (
            !Number.isFinite(latitude) ||
            !Number.isFinite(longitude) ||
            latitude < -90 ||
            latitude > 90 ||
            longitude < -180 ||
            longitude > 180
        ) {
            setWeatherError(
                "The selected farm has invalid coordinates. Update its location in My Farms."
            );
            setWeatherLoaded(false);
            return;
        }

        const requestId = ++weatherRequestId.current;

        setWeatherLoading(true);
        setWeatherError("");
        setWeatherLoaded(false);

        setFormData((previous) => ({
            ...previous,
            latitude,
            longitude,
            temperature: "",
            humidity: "",
            rainfall: ""
        }));

        try {
            const response = await api.post("/weather", {
                latitude,
                longitude
            });

            if (requestId !== weatherRequestId.current) {
                return;
            }

            const { temperature, humidity, rainfall } = response.data;

            if (
                temperature == null ||
                humidity == null ||
                rainfall == null ||
                !Number.isFinite(Number(temperature)) ||
                !Number.isFinite(Number(humidity)) ||
                !Number.isFinite(Number(rainfall))
            ) {
                throw new Error("The weather API returned invalid data.");
            }

            setFormData((previous) => ({
                ...previous,
                latitude,
                longitude,
                temperature,
                humidity,
                rainfall
            }));

            setWeatherLoaded(true);
        } catch (error) {
            if (requestId !== weatherRequestId.current) {
                return;
            }

            console.error("Weather fetch failed:", error);

            setWeatherError(
                error.response?.data?.message ||
                error.message ||
                "Unable to fetch weather for this farm."
            );
        } finally {
            if (requestId === weatherRequestId.current) {
                setWeatherLoading(false);
            }
        }
    };

    // Fetch weather when the registered farm changes.
    useEffect(() => {
        if (!selectedFarm) {
            weatherRequestId.current += 1;

            setWeatherLoading(false);
            setWeatherError("");
            setWeatherLoaded(false);

            setFormData((previous) => ({
                ...previous,
                latitude: "",
                longitude: "",
                temperature: "",
                humidity: "",
                rainfall: ""
            }));

            return;
        }

        fetchWeatherForLocation({
            latitude: selectedFarm.latitude,
            longitude: selectedFarm.longitude
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFarm?._id]);

    const weatherReady =
        weatherLoaded &&
        !weatherLoading &&
        formData.temperature !== "" &&
        formData.humidity !== "" &&
        formData.rainfall !== "" &&
        formData.latitude !== "" &&
        formData.longitude !== "";

    const canPredict =
        !predictionLoading &&
        !weatherLoading &&
        !weatherError &&
        !farmsLoading &&
        hasRegisteredFarms &&
        Boolean(selectedFarm?._id) &&
        weatherReady;

    return (
        <div className="prediction-form-compact">
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <form onSubmit={handlePredict}>
                        <div className="row g-3">

                            {/* LEFT: SOIL AND WEATHER */}
                            <div className="col-12 col-lg-6">

                                <section className="prediction-section border rounded-3 p-3 mb-3">
                                    <h5 className="text-success fw-bold section-heading">
                                        🧪 Soil Parameters
                                    </h5>

                                    <div className="row g-2">
                                        <div className="col-6">
                                            <label htmlFor="nitrogen" className="form-label">
                                                Nitrogen (N)
                                            </label>
                                            <input
                                                id="nitrogen"
                                                type="number"
                                                min="0"
                                                max="200"
                                                className="form-control"
                                                value={formData.nitrogen}
                                                onChange={(event) =>
                                                    setFormData((previous) => ({
                                                        ...previous,
                                                        nitrogen: event.target.value
                                                    }))
                                                }
                                                required
                                            />
                                        </div>

                                        <div className="col-6">
                                            <label htmlFor="phosphorus" className="form-label">
                                                Phosphorus (P)
                                            </label>
                                            <input
                                                id="phosphorus"
                                                type="number"
                                                min="0"
                                                max="200"
                                                className="form-control"
                                                value={formData.phosphorus}
                                                onChange={(event) =>
                                                    setFormData((previous) => ({
                                                        ...previous,
                                                        phosphorus: event.target.value
                                                    }))
                                                }
                                                required
                                            />
                                        </div>

                                        <div className="col-6">
                                            <label htmlFor="potassium" className="form-label">
                                                Potassium (K)
                                            </label>
                                            <input
                                                id="potassium"
                                                type="number"
                                                min="0"
                                                max="200"
                                                className="form-control"
                                                value={formData.potassium}
                                                onChange={(event) =>
                                                    setFormData((previous) => ({
                                                        ...previous,
                                                        potassium: event.target.value
                                                    }))
                                                }
                                                required
                                            />
                                        </div>

                                        <div className="col-6">
                                            <label htmlFor="ph" className="form-label">
                                                Soil pH
                                            </label>
                                            <input
                                                id="ph"
                                                type="number"
                                                min="0"
                                                max="14"
                                                step="0.1"
                                                className="form-control"
                                                value={formData.ph}
                                                onChange={(event) =>
                                                    setFormData((previous) => ({
                                                        ...previous,
                                                        ph: event.target.value
                                                    }))
                                                }
                                                required
                                            />
                                        </div>
                                    </div>
                                </section>

                                {/* WEATHER */}
                                <section className="prediction-section border rounded-3 p-3 bg-light">
                                    <h5 className="text-success fw-bold section-heading">
                                        🌦️ Weather Information
                                    </h5>

                                    {!selectedFarm && (
                                        <div className="alert alert-secondary compact-alert">
                                            Select a registered farm to fetch its weather.
                                        </div>
                                    )}

                                    {weatherLoading && (
                                        <div className="alert alert-info compact-alert" role="status">
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                aria-hidden="true"
                                            />
                                            Fetching weather...
                                        </div>
                                    )}

                                    {weatherLoaded && !weatherLoading && (
                                        <div className="alert alert-success compact-alert">
                                            ✓ Weather loaded successfully.
                                        </div>
                                    )}

                                    {weatherError && (
                                        <div className="alert alert-danger compact-alert" role="alert">
                                            {weatherError}
                                        </div>
                                    )}

                                    <div className="row g-2">
                                        <div className="col-6">
                                            <label htmlFor="temperature" className="form-label">
                                                🌡️ Temperature (°C)
                                            </label>
                                            <input
                                                id="temperature"
                                                type="number"
                                                className="form-control"
                                                value={formData.temperature}
                                                readOnly
                                            />
                                        </div>

                                        <div className="col-6">
                                            <label htmlFor="humidity" className="form-label">
                                                💧 Humidity (%)
                                            </label>
                                            <input
                                                id="humidity"
                                                type="number"
                                                className="form-control"
                                                value={formData.humidity}
                                                readOnly
                                            />
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="rainfall" className="form-label">
                                                🌧️ Rainfall (mm)
                                            </label>
                                            <input
                                                id="rainfall"
                                                type="number"
                                                className="form-control"
                                                value={formData.rainfall}
                                                readOnly
                                            />
                                        </div>
                                    </div>

                                    <div className="row g-2 mt-1">
                                        <div className="col-6">
                                            <label htmlFor="latitude" className="form-label">
                                                Latitude
                                            </label>
                                            <input
                                                id="latitude"
                                                type="number"
                                                className="form-control"
                                                value={formData.latitude}
                                                readOnly
                                            />
                                        </div>

                                        <div className="col-6">
                                            <label htmlFor="longitude" className="form-label">
                                                Longitude
                                            </label>
                                            <input
                                                id="longitude"
                                                type="number"
                                                className="form-control"
                                                value={formData.longitude}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* RIGHT: FARM LOCATION */}
                            <div className="col-12 col-lg-6">
                                <section className="prediction-section border rounded-3 p-3 bg-light h-100">
                                    <h5 className="text-success fw-bold section-heading">
                                        📍 Farm Location
                                    </h5>

                                    {selectedFarm ? (
                                        <>
                                            <h6 className="fw-semibold mb-2">
                                                {selectedFarm.name}
                                            </h6>

                                            <FarmLocation
                                                selectedLocation={{
                                                    latitude: selectedFarm.latitude,
                                                    longitude: selectedFarm.longitude
                                                }}
                                                readOnly
                                            />

                                            <p className="text-secondary small mt-2 mb-0">
                                                To change this location, visit My Farms.
                                            </p>
                                        </>
                                    ) : (
                                        <div className="alert alert-secondary compact-alert">
                                            Select a registered farm above to view its location.
                                        </div>
                                    )}
                                </section>
                            </div>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="prediction-actions d-flex flex-wrap gap-2 mt-3">
                            <button
                                type="submit"
                                className="btn btn-success"
                                disabled={!canPredict}
                            >
                                {predictionLoading
                                    ? "Predicting..."
                                    : weatherLoading
                                        ? "Fetching Weather..."
                                        : "🌱 Predict Crop"}
                            </button>

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={handleReset}
                                disabled={predictionLoading || weatherLoading}
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PredictionForm;
