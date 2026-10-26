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

    // Prevent an older weather request from overwriting newer results.
    const weatherRequestId = useRef(0);

    const fetchWeatherForLocation = async (location) => {
        const latitude = Number(location.latitude);
        const longitude = Number(location.longitude);

        if (
            !Number.isFinite(latitude) ||
            !Number.isFinite(longitude)
        ) {
            return;
        }

        const requestId = ++weatherRequestId.current;

        setFormData((previous) => ({
            ...previous,
            latitude,
            longitude,
            temperature: "",
            humidity: "",
            rainfall: ""
        }));

        try {
            setWeatherLoading(true);

            const response = await api.post("/weather", {
                latitude,
                longitude
            });

            // Ignore results from an older request.
            if (requestId !== weatherRequestId.current) {
                return;
            }

            setFormData((previous) => ({
                ...previous,
                latitude,
                longitude,
                temperature: response.data.temperature,
                humidity: response.data.humidity,
                rainfall: response.data.rainfall
            }));
        } catch (error) {
            if (requestId !== weatherRequestId.current) {
                return;
            }

            console.error("Weather fetch failed:", error);

            alert(
                error.response?.data?.message ||
                "Unable to fetch weather data for this location."
            );
        } finally {
            if (requestId === weatherRequestId.current) {
                setWeatherLoading(false);
            }
        }
    };

    // Fetch weather automatically when the registered farm changes.
    useEffect(() => {
        if (!selectedFarm) {
            // Invalidate any pending request for the previous farm.
            weatherRequestId.current += 1;
            setWeatherLoading(false);
            return;
        }

        fetchWeatherForLocation({
            latitude: selectedFarm.latitude,
            longitude: selectedFarm.longitude
        });

        // Re-run when a different registered farm is selected.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFarm?._id]);

    // This also supports manual map clicks, marker dragging, and location search.
    const handleLocationSelect = (location) => {
        fetchWeatherForLocation(location);
    };

    return (
        <form onSubmit={handlePredict}>
            <h2>Farm Location</h2>

            <FarmLocation
                onLocationSelect={handleLocationSelect}
                selectedLocation={
                    selectedFarm
                        ? {
                            latitude: selectedFarm.latitude,
                            longitude: selectedFarm.longitude
                        }
                        : null
                }
            />

            <h2>Soil Nutrients</h2>

            <div>
                <label htmlFor="nitrogen">Nitrogen (N)</label>
                <input
                    id="nitrogen"
                    type="number"
                    min="0"
                    max="200"
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

            <div>
                <label htmlFor="phosphorus">Phosphorus (P)</label>
                <input
                    id="phosphorus"
                    type="number"
                    min="0"
                    max="200"
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

            <div>
                <label htmlFor="potassium">Potassium (K)</label>
                <input
                    id="potassium"
                    type="number"
                    min="0"
                    max="200"
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

            <div>
                <label htmlFor="ph">Soil pH</label>
                <input
                    id="ph"
                    type="number"
                    min="0"
                    max="14"
                    step="0.1"
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

            <h2>Weather Information</h2>

            {weatherLoading && (
                <p>Fetching weather data...</p>
            )}

            <div>
                <label htmlFor="temperature">Temperature (°C)</label>
                <input
                    id="temperature"
                    type="number"
                    value={formData.temperature}
                    readOnly
                    required
                />
            </div>

            <div>
                <label htmlFor="humidity">Humidity (%)</label>
                <input
                    id="humidity"
                    type="number"
                    value={formData.humidity}
                    readOnly
                    required
                />
            </div>

            <div>
                <label htmlFor="rainfall">Rainfall (mm)</label>
                <input
                    id="rainfall"
                    type="number"
                    value={formData.rainfall}
                    readOnly
                    required
                />
            </div>

            <div>
                <label htmlFor="latitude">Latitude</label>
                <input
                    id="latitude"
                    type="number"
                    value={formData.latitude}
                    readOnly
                />
            </div>

            <div>
                <label htmlFor="longitude">Longitude</label>
                <input
                    id="longitude"
                    type="number"
                    value={formData.longitude}
                    readOnly
                />
            </div>

            <button
                type="submit"
                disabled={
                    predictionLoading ||
                    weatherLoading ||
                    farmsLoading ||
                    !hasRegisteredFarms ||
                    !formData.temperature ||
                    !formData.humidity ||
                    formData.rainfall === ""
                }
            >
                {predictionLoading
                    ? "Predicting..."
                    : "Predict Crop"}
            </button>

            <button
                type="button"
                onClick={handleReset}
                disabled={predictionLoading || weatherLoading}
            >
                Reset
            </button>
        </form>
    );
};

export default PredictionForm;
