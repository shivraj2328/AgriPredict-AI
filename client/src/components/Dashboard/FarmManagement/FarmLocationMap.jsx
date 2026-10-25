import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function FarmLocationMap({ latitude, longitude, farmName }) {
    const lat = Number(latitude);
    const lng = Number(longitude);

    if (
        !Number.isFinite(lat) ||
        !Number.isFinite(lng) ||
        lat < -90 ||
        lat > 90 ||
        lng < -180 ||
        lng > 180
    ) {
        return <p>Invalid farm coordinates.</p>;
    }

    return (
        <div className="farm-location-map">
            <MapContainer
                center={[lat, lng]}
                zoom={13}
                style={{ height: "250px", width: "100%" }}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={[lat, lng]}>
                    <Popup>
                        <strong>{farmName}</strong>
                        <br />
                        Farm location
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

export default FarmLocationMap;
