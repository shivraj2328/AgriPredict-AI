import { useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    useMap,
    useMapEvents
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});


// --------------------------------------------------
// Location Marker
// --------------------------------------------------

function LocationMarker({ position, setPosition }) {

    useMapEvents({
        click(event) {

            setPosition([
                event.latlng.lat,
                event.latlng.lng
            ]);

        }
    });

    return position ? (
        <Marker
            position={position}
            draggable={true}
            eventHandlers={{
                dragend: (event) => {

                    const marker = event.target;
                    const location = marker.getLatLng();

                    setPosition([
                        location.lat,
                        location.lng
                    ]);
                }
            }}
        />
    ) : null;
}


// --------------------------------------------------
// Map Controller
// --------------------------------------------------

function MapController({ searchLocation }) {

    const map = useMap();

    if (searchLocation) {

        map.flyTo(
            [
                searchLocation.latitude,
                searchLocation.longitude
            ],
            14,
            {
                duration: 1.5
            }
        );
    }

    return null;
}


// --------------------------------------------------
// Farm Location Picker
// --------------------------------------------------

function FarmLocationPicker({ onLocationSelect }) {

    const [position, setPosition] = useState(null);

    const [mapType, setMapType] = useState("map");

    const [searchText, setSearchText] = useState("");

    const [searchLocation, setSearchLocation] = useState(null);

    const [searching, setSearching] = useState(false);

    const [searchError, setSearchError] = useState("");

    const [locationName, setLocationName] = useState("");


    // --------------------------------------------------
    // Handle Location Change
    // --------------------------------------------------

    const handleLocationChange = (newPosition) => {

        setPosition(newPosition);

        if (onLocationSelect) {

            onLocationSelect({
                latitude: newPosition[0],
                longitude: newPosition[1]
            });
        }
    };


    // --------------------------------------------------
    // Search Village / City
    // --------------------------------------------------

    const handleSearch = async () => {

        const query = searchText.trim();

        if (!query) {
            setSearchError("Please enter a village, city or location.");
            return;
        }

        try {

            setSearching(true);
            setSearchError("");

            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=in&q=${encodeURIComponent(query)}`
            );

            if (!response.ok) {
                throw new Error("Location search failed");
            }

            const results = await response.json();

            if (!results.length) {

                setSearchError(
                    "Location not found. Try entering the village, district and state."
                );

                return;
            }

            const result = results[0];

            const latitude = Number(result.lat);
            const longitude = Number(result.lon);

            const newPosition = [
                latitude,
                longitude
            ];

            setPosition(newPosition);

            setSearchLocation({
                latitude,
                longitude
            });

            setLocationName(result.display_name);

            if (onLocationSelect) {

                onLocationSelect({
                    latitude,
                    longitude
                });
            }

        } catch (error) {

            console.error("Location search error:", error);

            setSearchError(
                "Unable to search this location. Please try again."
            );

        } finally {

            setSearching(false);

        }
    };


    // --------------------------------------------------
    // Enter Key Search
    // --------------------------------------------------

    const handleSearchKeyDown = (event) => {

        if (event.key === "Enter") {
            handleSearch();
        }

    };


    return (
        <div className="farm-location-picker w-100 mb-4">

            <h5 className="mb-2">
                Farm Location
            </h5>


            <p className="text-muted small mb-3">
                Search for your village or city, then select the exact
                farm location on the map.
            </p>


            {/* ------------------------------------------ */}
            {/* Location Search */}
            {/* ------------------------------------------ */}

            <div className="mb-3">

                <label className="form-label fw-semibold">
                    Search Village / City
                </label>

                <div className="d-flex gap-2">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Baramati, Pune, Maharashtra"
                        value={searchText}
                        onChange={(event) =>
                            setSearchText(event.target.value)
                        }
                        onKeyDown={handleSearchKeyDown}
                    />

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSearch}
                        disabled={searching}
                    >
                        {searching ? "Searching..." : "Search"}
                    </button>

                </div>


                <div className="form-text">
                    For better results, enter village, district and state.
                </div>


                {searchError && (
                    <div className="alert alert-danger mt-2 mb-0 py-2">
                        {searchError}
                    </div>
                )}


                {locationName && !searchError && (
                    <div className="alert alert-success mt-2 mb-0 py-2 small">
                        <strong>Found:</strong> {locationName}
                    </div>
                )}

            </div>


            {/* ------------------------------------------ */}
            {/* Map / Satellite Toggle */}
            {/* ------------------------------------------ */}

            <div className="mb-2 d-flex gap-2">

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


            {/* ------------------------------------------ */}
            {/* Map */}
            {/* ------------------------------------------ */}

            <div
                style={{
                    height: "350px",
                    width: "100%",
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: "1px solid #dee2e6"
                }}
            >

                <MapContainer
                    center={[20.5937, 78.9629]}
                    zoom={5}
                    style={{
                        height: "100%",
                        width: "100%"
                    }}
                >

                    {/* ---------------------------------- */}
                    {/* Normal Map */}
                    {/* ---------------------------------- */}

                    {mapType === "map" && (

                        <TileLayer
                            attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                    )}


                    {/* ---------------------------------- */}
                    {/* Satellite */}
                    {/* ---------------------------------- */}

                    {mapType === "satellite" && (

                        <>
                            <TileLayer
                                attribution="Tiles &copy; Esri"
                                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                            />


                            {/* Place Names / Boundaries */}

                            <TileLayer
                                attribution="Labels &copy; Esri"
                                url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
                            />


                            {/* Roads / Transportation */}

                            <TileLayer
                                attribution="Transportation &copy; Esri"
                                url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}"
                            />

                        </>

                    )}


                    {/* ---------------------------------- */}
                    {/* Search Location Controller */}
                    {/* ---------------------------------- */}

                    <MapController
                        searchLocation={searchLocation}
                    />


                    {/* ---------------------------------- */}
                    {/* Farm Marker */}
                    {/* ---------------------------------- */}

                    <LocationMarker
                        position={position}
                        setPosition={handleLocationChange}
                    />

                </MapContainer>

            </div>


            {/* ------------------------------------------ */}
            {/* Instructions */}
            {/* ------------------------------------------ */}

            <p className="text-muted small mt-2 mb-0">

                📍 Search your village first, then click on your
                farm location or drag the pin to the exact field.

            </p>


            {/* ------------------------------------------ */}
            {/* Selected Coordinates */}
            {/* ------------------------------------------ */}

            {position && (

                <div className="mt-3 p-2 bg-light rounded small border">

                    <strong>
                        Selected Farm Location:
                    </strong>

                    <div className="mt-1">

                        Latitude:
                        <span className="ms-1">
                            {position[0].toFixed(6)}
                        </span>

                    </div>

                    <div>

                        Longitude:
                        <span className="ms-1">
                            {position[1].toFixed(6)}
                        </span>

                    </div>

                </div>

            )}

        </div>
    );
}


export default FarmLocationPicker;