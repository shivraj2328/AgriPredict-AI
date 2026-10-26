import { useEffect, useState } from "react";

import {
    MapContainer,
    TileLayer,
    Marker,
    useMap,
    useMapEvents
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default Leaflet marker icons.
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png"
});

const DEFAULT_POSITION = [18.5204, 73.8567];

// Move the map when the selected location changes.
const MapController = ({ position }) => {
    const map = useMap();

    useEffect(() => {
        if (position) {
            map.flyTo(position, 15, {
                animate: true,
                duration: 1
            });
        }
    }, [position, map]);

    return null;
};

// Handle map clicks when location selection is enabled.
const MapClickHandler = ({ onLocationChange, enabled }) => {
    useMapEvents({
        click(event) {
            if (!enabled) return;

            onLocationChange([
                event.latlng.lat,
                event.latlng.lng
            ]);
        }
    });

    return null;
};

const FarmLocation = ({
    onLocationSelect,
    selectedLocation,
    readOnly = false
}) => {
    const [position, setPosition] = useState(DEFAULT_POSITION);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState("");
    const [mapType, setMapType] = useState("map");

    // Sync the map with the selected farm's saved coordinates.
    useEffect(() => {
        if (
            !selectedLocation ||
            selectedLocation.latitude === undefined ||
            selectedLocation.longitude === undefined
        ) {
            return;
        }

        const latitude = Number(selectedLocation.latitude);
        const longitude = Number(selectedLocation.longitude);

        if (
            !Number.isFinite(latitude) ||
            !Number.isFinite(longitude) ||
            latitude < -90 ||
            latitude > 90 ||
            longitude < -180 ||
            longitude > 180
        ) {
            return;
        }

        setPosition([latitude, longitude]);
    }, [
        selectedLocation?.latitude,
        selectedLocation?.longitude
    ]);

    const handleLocationChange = (newPosition) => {
        if (readOnly) return;

        const [latitude, longitude] = newPosition;

        if (
            !Number.isFinite(latitude) ||
            !Number.isFinite(longitude)
        ) {
            return;
        }

        setPosition(newPosition);
        setSearchError("");

        onLocationSelect?.({
            latitude,
            longitude
        });
    };

    const handleSearch = async (event) => {
        event.preventDefault();

        if (readOnly) return;

        const query = searchQuery.trim();

        if (!query) {
            setSearchError("Please enter a location to search.");
            return;
        }

        try {
            setSearchLoading(true);
            setSearchError("");

            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`
            );

            if (!response.ok) {
                throw new Error("Location search failed.");
            }

            const results = await response.json();

            if (!results.length) {
                setSearchError("No matching location found.");
                return;
            }

            const latitude = Number(results[0].lat);
            const longitude = Number(results[0].lon);

            if (
                !Number.isFinite(latitude) ||
                !Number.isFinite(longitude) ||
                latitude < -90 ||
                latitude > 90 ||
                longitude < -180 ||
                longitude > 180
            ) {
                setSearchError("The returned location is invalid.");
                return;
            }

            handleLocationChange([latitude, longitude]);
        } catch (error) {
            console.error("Location search error:", error);

            setSearchError(
                "Unable to search for this location. Please try again."
            );
        } finally {
            setSearchLoading(false);
        }
    };

    return (
        <div className="farm-location-picker">

            {!readOnly && (
                <>
                    <p className="text-secondary small mb-3">
                        Search your village or city, then select your
                        farm on the map.
                    </p>

                    <form
                        onSubmit={handleSearch}
                        className="d-flex gap-2 mb-2"
                    >
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(event) =>
                                setSearchQuery(event.target.value)
                            }
                            placeholder="e.g. Baramati, Pune, Maharashtra"
                            aria-label="Search farm location"
                            className="form-control"
                        />

                        <button
                            type="submit"
                            disabled={searchLoading}
                            className="btn btn-primary"
                        >
                            {searchLoading
                                ? "Searching..."
                                : "Search"}
                        </button>
                    </form>

                    <small className="text-secondary d-block mb-2">
                        For better results, enter village, district and state.
                    </small>

                    {searchError && (
                        <div className="alert alert-danger py-2 small">
                            {searchError}
                        </div>
                    )}
                </>
            )}

            {/* Map view controls */}
            <div className="d-flex gap-2 mb-2">
                <button
                    type="button"
                    className={`btn btn-sm ${
                        mapType === "map"
                            ? "btn-primary"
                            : "btn-outline-primary"
                    }`}
                    onClick={() => setMapType("map")}
                >
                    🗺️ Map
                </button>

                <button
                    type="button"
                    className={`btn btn-sm ${
                        mapType === "satellite"
                            ? "btn-primary"
                            : "btn-outline-primary"
                    }`}
                    onClick={() => setMapType("satellite")}
                >
                    🛰️ Satellite
                </button>
            </div>

            {/* Actual farm location */}
            <div
                className="farm-map-container"
                style={{
                    height: readOnly ? "320px" : "350px",
                    width: "100%",
                    borderRadius: "10px",
                    overflow: "hidden"
                }}
            >
                <MapContainer
                    center={position}
                    zoom={15}
                    scrollWheelZoom={!readOnly}
                    dragging={!readOnly}
                    doubleClickZoom={!readOnly}
                    touchZoom={!readOnly}
                    keyboard={!readOnly}
                    style={{
                        height: "100%",
                        width: "100%"
                    }}
                >
                    {mapType === "map" ? (
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                    ) : (
                        <TileLayer
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                            attribution="Tiles &copy; Esri"
                        />
                    )}

                    <MapController position={position} />

                    <MapClickHandler
                        enabled={!readOnly}
                        onLocationChange={handleLocationChange}
                    />

                    <Marker
                        position={position}
                        draggable={!readOnly}
                        eventHandlers={{
                            dragend(event) {
                                if (readOnly) return;

                                const marker = event.target;
                                const coordinates = marker.getLatLng();

                                handleLocationChange([
                                    coordinates.lat,
                                    coordinates.lng
                                ]);
                            }
                        }}
                    />
                </MapContainer>
            </div>

            {/* Coordinates */}
            <div className="border rounded-3 bg-white p-3 mt-3 small">
                <strong>
                    {readOnly
                        ? "Registered Farm Location"
                        : "Selected Farm Location"}
                </strong>

                <div className="mt-2">
                    Latitude: {position[0].toFixed(6)}
                </div>

                <div>
                    Longitude: {position[1].toFixed(6)}
                </div>
            </div>
        </div>
    );
};

export default FarmLocation;

