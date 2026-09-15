import { useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    useMapEvents
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "./FarmLocationPicker.css";

// Fix default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

function LocationMarker({ position, setPosition }) {
    useMapEvents({
        click(event) {
            setPosition([
                event.latlng.lat,
                event.latlng.lng
            ]);
        }
    });

    return position ? <Marker position={position} /> : null;
}

function FarmLocationPicker({ onLocationSelect }) {
    const [position, setPosition] = useState(null);

    const handleLocationChange = (newPosition) => {
        setPosition(newPosition);

        onLocationSelect({
            latitude: newPosition[0],
            longitude: newPosition[1]
        });
    };

    return (
        <div className="farm-location-picker">

            <h3>Farm Location</h3>

            <p className="location-description">
                Click on the map to select your farm location.
            </p>

            <MapContainer
                center={[20.5937, 78.9629]}
                zoom={5}
                className="farm-map"
            >

                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <LocationMarker
                    position={position}
                    setPosition={handleLocationChange}
                />

            </MapContainer>

            {position && (
                <div className="selected-location">

                    <strong>Selected Location</strong>

                    <p>
                        Latitude: {position[0].toFixed(6)}
                    </p>

                    <p>
                        Longitude: {position[1].toFixed(6)}
                    </p>

                </div>
            )}

        </div>
    );
}

export default FarmLocationPicker;