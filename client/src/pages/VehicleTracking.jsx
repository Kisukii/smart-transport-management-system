import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function VehicleTracking({ goBack }) {
  // Demo vehicle data
  const vehicle = {
    vehicleNo: "KL-07-AB-1234",
    driver: "John Mathew",
    status: "Moving",
    speed: "48 km/h",
    latitude: 9.9312,
    longitude: 76.2673,
    destination: "Kochi Warehouse",
    lastUpdated: "10:45 AM",
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">

      {/* Back Button */}
      <button
        onClick={goBack}
        className="bg-slate-700 hover:bg-slate-600 px-5 py-2 rounded-lg mb-6"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-4xl font-bold mb-8">
         Vehicle Tracking
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Map */}
        <div className="lg:col-span-2 bg-[#1e293b] rounded-2xl p-4">

          <MapContainer
            center={[vehicle.latitude, vehicle.longitude]}
            zoom={13}
            style={{
              height: "500px",
              width: "100%",
              borderRadius: "15px",
            }}
          >
            <TileLayer
              attribution="© OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[vehicle.latitude, vehicle.longitude]}>
              <Popup>
                <strong>{vehicle.vehicleNo}</strong>
                <br />
                Driver: {vehicle.driver}
              </Popup>
            </Marker>
          </MapContainer>

        </div>

        {/* Vehicle Details */}
        <div className="bg-[#1e293b] rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            Vehicle Details
          </h2>

          <div className="space-y-4 text-lg">

            <div className="flex justify-between">
              <span className="text-gray-400">Vehicle No</span>
              <span>{vehicle.vehicleNo}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Driver</span>
              <span>{vehicle.driver}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Status</span>
              <span className="text-green-400">
                🟢 {vehicle.status}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Speed</span>
              <span>{vehicle.speed}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Latitude</span>
              <span>{vehicle.latitude}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Longitude</span>
              <span>{vehicle.longitude}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Destination</span>
              <span>{vehicle.destination}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Last Updated</span>
              <span>{vehicle.lastUpdated}</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}