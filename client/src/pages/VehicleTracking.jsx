import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import axios from "axios";

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
  const [vehicles, setVehicles] = useState([]);
  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      setLoading(true);
      try {
        const [vehRes, ordRes, drvRes] = await Promise.all([
          axios.get("http://localhost:5000/api/vehicles").catch(() => ({ data: [] })),
          axios.get("http://localhost:5000/api/orders", { headers: { Authorization: `Bearer ${token}` } }).catch(() => ({ data: [] })),
          axios.get("http://localhost:5000/api/drivers", { headers: { Authorization: `Bearer ${token}` } }).catch(() => ({ data: [] })),
        ]);

        setVehicles(Array.isArray(vehRes.data) ? vehRes.data : vehRes.data.vehicles || []);
        setOrders(Array.isArray(ordRes.data) ? ordRes.data : ordRes.data.orders || []);
        setDrivers(Array.isArray(drvRes.data) ? drvRes.data : drvRes.data || []);

        // select first vehicle if exists
        const first = (Array.isArray(vehRes.data) ? vehRes.data : vehRes.data.vehicles || [])[0];
        if (first) {
          setSelected(normalizeVehicle(first, 0));
        }
      } catch (err) {
        setError(err.message || "Failed to load vehicle data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const baseLat = 9.9312;
  const baseLng = 76.2673;

  // Provide deterministic coordinates for demo purposes when backend has none
  const normalizeVehicle = (veh, idx) => {
    const offset = (idx % 5) * 0.01;
    return {
      ...veh,
      latitude: veh.latitude || baseLat + offset,
      longitude: veh.longitude || baseLng + offset,
    };
  };

  const handleSelect = (veh, idx) => {
    setSelected(normalizeVehicle(veh, idx));
  };

  if (loading) return <div className="p-8 text-white">Loading vehicle tracking...</div>;
  if (error) return <div className="p-8 text-red-400">{error}</div>;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">
      <button onClick={goBack} className="bg-slate-700 hover:bg-slate-600 px-5 py-2 rounded-lg mb-6">← Back to Dashboard</button>

      <h1 className="text-4xl font-bold mb-8">Vehicle Tracking</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#1e293b] rounded-2xl p-4">
          <MapContainer
            center={[selected?.latitude || baseLat, selected?.longitude || baseLng]}
            zoom={13}
            style={{ height: "500px", width: "100%", borderRadius: "15px" }}
          >
            <TileLayer attribution="© OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {selected && (
              <Marker position={[selected.latitude, selected.longitude]}>
                <Popup>
                  <strong>{selected.vehicleNumber || selected.vehicleNo || selected.vehicleId}</strong>
                  <br />
                  Status: {selected.status}
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>

        <div className="bg-[#1e293b] rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6">Vehicles</h2>

          <div className="space-y-3 max-h-[420px] overflow-y-auto">
            {vehicles.map((v, i) => {
              const assocOrder = orders.find((o) => o.vehicle && o.vehicle.toString() === v._id?.toString());
              return (
                <div key={v._id || v.vehicleId} className="p-3 bg-slate-800 rounded-lg flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{v.vehicleNumber || v.vehicleId}</div>
                    <div className="text-slate-400 text-sm">{v.type} • {v.status}</div>
                    {assocOrder && (
                      <div className="text-slate-400 text-sm">Assigned to order: {assocOrder._id}</div>
                    )}
                  </div>
                  <div className="flex flex-col items-end">
                    <button onClick={() => handleSelect(v, i)} className="bg-cyan-600 hover:bg-cyan-700 px-3 py-1 rounded">View</button>
                    <div className="text-sm text-slate-400 mt-2">{(v.updatedAt || v.createdAt) ? new Date(v.updatedAt || v.createdAt).toLocaleString() : "-"}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {selected && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold">Selected Vehicle</h3>
              <div className="mt-3 space-y-2 text-lg">
                <div className="flex justify-between"><span className="text-gray-400">Vehicle No</span><span>{selected.vehicleNumber || selected.vehicleId}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Status</span><span>{selected.status}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Latitude</span><span>{selected.latitude}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Longitude</span><span>{selected.longitude}</span></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}