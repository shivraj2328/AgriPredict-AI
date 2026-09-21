import { useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
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


function FarmLocationPicker({ onLocationSelect }) {

    const [position, setPosition] = useState(null);


    const handleLocationChange = (newPosition) => {

        setPosition(newPosition);

        if (onLocationSelect) {

            onLocationSelect({
                latitude: newPosition[0],
                longitude: newPosition[1]
            });

        }
    };


    return (
        <div className="farm-location-picker w-100 mb-4">

            <h5 className="mb-2">
                Farm Location
            </h5>

            <p className="text-muted small mb-3">
                Click on the map to select your farm location.
                You can also drag the pin.
            </p>


            <div
                style={{
                    height: "300px",
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

                    <TileLayer
                        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />


                    <LocationMarker
                        position={position}
                        setPosition={handleLocationChange}
                    />

                </MapContainer>

            </div>


            {position && (

                <div className="mt-3 p-2 bg-light rounded small border">

                    <strong>
                        Selected Location:
                    </strong>

                    <span className="ms-2">
                        Latitude: {position[0].toFixed(6)}
                    </span>

                    <span className="ms-3">
                        Longitude: {position[1].toFixed(6)}
                    </span>

                </div>

            )}

        </div>
    );
}


export default FarmLocationPicker;