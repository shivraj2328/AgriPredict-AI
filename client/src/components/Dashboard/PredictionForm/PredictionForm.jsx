import { useEffect, useRef, useState } from "react";

import api from "../../../services/api";
import FarmLocation from "../FarmLocationPicker/FarmLocationPicker";

const VALIDATION_RULES = {
nitrogen: { label: "Nitrogen (N)", min: 0, max: 200 },
phosphorus: { label: "Phosphorus (P)", min: 0, max: 200 },
potassium: { label: "Potassium (K)", min: 0, max: 200 },
ph: { label: "Soil pH", min: 0, max: 14 }
};

const validateSoilValue = (field, value) => {
const rule = VALIDATION_RULES[field];


if (value === "" || value === null || value === undefined) {
    return `${rule.label} is required.`;
}

const numericValue = Number(value);

if (!Number.isFinite(numericValue)) {
    return `Enter a valid number for ${rule.label}.`;
}

if (numericValue < rule.min || numericValue > rule.max) {
    return `${rule.label} must be between ${rule.min} and ${rule.max}.`;
}

return "";

};

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
const [soilErrors, setSoilErrors] = useState({});
const [submitError, setSubmitError] = useState("");

const weatherRequestId = useRef(0);

const updateSoilValue = (field, value) => {
    setFormData((previous) => ({
        ...previous,
        [field]: value
    }));

    setSoilErrors((previous) => ({
        ...previous,
        [field]: validateSoilValue(field, value)
    }));

    setSubmitError("");
};

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

const currentSoilErrors = Object.keys(VALIDATION_RULES).reduce(
    (errors, field) => {
        const message = validateSoilValue(field, formData[field]);

        if (message) {
            errors[field] = message;
        }

        return errors;
    },
    {}
);

const soilValuesValid = Object.keys(currentSoilErrors).length === 0;

const canPredict =
    soilValuesValid &&
    !predictionLoading &&
    !weatherLoading &&
    !weatherError &&
    !farmsLoading &&
    hasRegisteredFarms &&
    Boolean(selectedFarm?._id) &&
    weatherReady;

const onSubmit = (event) => {
    event.preventDefault();

    const errors = {};

    Object.keys(VALIDATION_RULES).forEach((field) => {
        const message = validateSoilValue(field, formData[field]);

        if (message) {
            errors[field] = message;
        }
    });

    setSoilErrors(errors);

    if (Object.keys(errors).length > 0) {
        setSubmitError(
            "Please correct the highlighted soil values before predicting."
        );
        return;
    }

    setSubmitError("");
    handlePredict(event);
};

const renderSoilError = (field) =>
    soilErrors[field] ? (
        <div className="text-danger small mt-1" role="alert">
            {soilErrors[field]}
        </div>
    ) : null;

return (
    <div className="prediction-form-compact">
        <div className="card shadow-sm border-0">
            <div className="card-body">
                <form onSubmit={onSubmit} noValidate>
                    {submitError && (
                        <div className="alert alert-danger" role="alert">
                            {submitError}
                        </div>
                    )}

                    <div className="row g-3">
                        <div className="col-12 col-lg-6">
                            <section className="prediction-section border rounded-3 p-3 mb-3">
                                <h5 className="text-success fw-bold section-heading">
                                    🧪 Soil Parameters
                                </h5>

                                <div className="row g-2">
                                    {[
                                        ["nitrogen", "Nitrogen (N)"],
                                        ["phosphorus", "Phosphorus (P)"],
                                        ["potassium", "Potassium (K)"],
                                        ["ph", "Soil pH"]
                                    ].map(([field, label]) => {
                                        const rule = VALIDATION_RULES[field];

                                        return (
                                            <div className="col-6" key={field}>
                                                <label
                                                    htmlFor={field}
                                                    className="form-label"
                                                >
                                                    {label}
                                                </label>

                                                <input
                                                    id={field}
                                                    type="number"
                                                    min={rule.min}
                                                    max={rule.max}
                                                    step={field === "ph" ? "0.1" : "1"}
                                                    className={`form-control ${
                                                        soilErrors[field]
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    value={formData[field]}
                                                    onChange={(event) =>
                                                        updateSoilValue(
                                                            field,
                                                            event.target.value
                                                        )
                                                    }
                                                    aria-invalid={Boolean(
                                                        soilErrors[field]
                                                    )}
                                                    aria-describedby={`${field}-error`}
                                                    required
                                                />

                                                <div
                                                    id={`${field}-error`}
                                                    className="text-danger small mt-1"
                                                    role="alert"
                                                >
                                                    {soilErrors[field] || ""}
                                                </div>

                                                <div className="form-text">
                                                    Range: {rule.min}–{rule.max}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>

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
                                    : !soilValuesValid
                                        ? "Correct Soil Values"
                                        : "🌱 Predict Crop"}
                        </button>

                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => {
                                setSoilErrors({});
                                setSubmitError("");
                                handleReset();
                            }}
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
