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

// Fix the default Leaflet marker icon.
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

// Updates the map when the selected location changes.
const MapController = ({ position }) => {
    const map = useMap();

    useEffect(() => {
        if (position) {
            map.flyTo(position, 13, {
                animate: true,
                duration: 1
            });
        }
    }, [position, map]);

    return null;
};

// Handles clicks on the map.
const MapClickHandler = ({ onLocationChange }) => {
    useMapEvents({
        click(event) {
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
    selectedLocation
}) => {
    const [position, setPosition] = useState(DEFAULT_POSITION);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState("");

    // Synchronize the map with the selected registered farm.
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

    // Update the marker and notify PredictionForm.
    const handleLocationChange = (newPosition) => {
        const [latitude, longitude] = newPosition;

        setPosition(newPosition);
        setSearchError("");

        onLocationSelect({
            latitude,
            longitude
        });
    };

    // Search for a location using OpenStreetMap's Nominatim service.
    const handleSearch = async (event) => {
        event.preventDefault();

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
                !Number.isFinite(longitude)
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
            <h3>Select Farm Location</h3>

            <p>
                Select your farm by clicking the map, dragging the marker,
                or searching for a location.
            </p>

            <form
                onSubmit={handleSearch}
                className="farm-location-search"
            >
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) =>
                        setSearchQuery(event.target.value)
                    }
                    placeholder="Search village, city, or address"
                    aria-label="Search farm location"
                />

                <button
                    type="submit"
                    disabled={searchLoading}
                >
                    {searchLoading ? "Searching..." : "Search"}
                </button>
            </form>

            {searchError && (
                <p role="alert" className="location-error">
                    {searchError}
                </p>
            )}

            <div
                className="farm-map-container"
                style={{
                    height: "350px",
                    width: "100%",
                    borderRadius: "10px",
                    overflow: "hidden"
                }}
            >
                <MapContainer
                    center={position}
                    zoom={13}
                    scrollWheelZoom
                    style={{
                        height: "100%",
                        width: "100%"
                    }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <MapController position={position} />

                    <MapClickHandler
                        onLocationChange={handleLocationChange}
                    />

                    <Marker
                        position={position}
                        draggable
                        eventHandlers={{
                            dragend(event) {
                                const marker = event.target;
                                const newPosition = marker.getLatLng();

                                handleLocationChange([
                                    newPosition.lat,
                                    newPosition.lng
                                ]);
                            }
                        }}
                    />
                </MapContainer>
            </div>

            <div className="selected-coordinates">
                <p>
                    <strong>Latitude:</strong>{" "}
                    {position[0].toFixed(6)}
                </p>

                <p>
                    <strong>Longitude:</strong>{" "}
                    {position[1].toFixed(6)}
                </p>
            </div>
        </div>
    );
};

export default FarmLocation;
