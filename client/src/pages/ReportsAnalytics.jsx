import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ReportsAnalytics({ goBack }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [orders, setOrders] = useState([]);
  const [requests, setRequests] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchAll = async () => {
      setLoading(true);
      setError("");
      try {
        const [reqRes, ordRes, vehRes, drvRes] = await Promise.all([
          axios
            .get("http://localhost:5000/api/orderrequests/my", {
              headers: { Authorization: `Bearer ${token}` },
            })
            .catch(() => ({ data: [] })),
          axios
            .get("http://localhost:5000/api/orders", {
              headers: { Authorization: `Bearer ${token}` },
            })
            .catch(() => ({ data: [] })),
          axios.get("http://localhost:5000/api/vehicles").catch(() => ({ data: [] })),
          axios.get("http://localhost:5000/api/drivers").catch(() => ({ data: [] })),
        ]);

        setRequests(Array.isArray(reqRes.data) ? reqRes.data : reqRes.data.requests || []);
        setOrders(Array.isArray(ordRes.data) ? ordRes.data : ordRes.data.orders || []);
        setVehicles(Array.isArray(vehRes.data) ? vehRes.data : vehRes.data.vehicles || []);
        setDrivers(Array.isArray(drvRes.data) ? drvRes.data : drvRes.data || []);
      } catch (err) {
        setError(err.message || "Failed to load reports");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // Compute stats
  const totalShipments = orders.length + requests.length;
  const completedDeliveries = orders.filter((o) => o.status === "Delivered").length;
  const activeVehicles = vehicles.length;
  const pendingOrders = requests.filter((r) => r.status === "Pending").length;

  // Weekly shipments from orders by createdAt
  const shipmentDataMap = {};
  [...orders, ...requests].forEach((o) => {
    const d = new Date(o.createdAt || o.created_at || Date.now());
    const day = d.toLocaleDateString(undefined, { weekday: "short" });
    shipmentDataMap[day] = (shipmentDataMap[day] || 0) + 1;
  });

  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const shipmentData = weekdays.map((day) => ({ day, shipments: shipmentDataMap[day] || 0 }));

  const driverStatusCounts = {
    Available: 0,
    Busy: 0,
    "On Leave": 0,
  };

  drivers.forEach((d) => {
    const status = d.status || "Available";
    if (status === "Busy") driverStatusCounts.Busy += 1;
    else if (status === "On Leave") driverStatusCounts["On Leave"] += 1;
    else driverStatusCounts.Available += 1;
  });

  const driverData = [
    { name: "Available", value: driverStatusCounts.Available },
    { name: "Busy", value: driverStatusCounts.Busy },
    { name: "On Leave", value: driverStatusCounts["On Leave"] },
  ];

  const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">
      <button
        onClick={goBack}
        className="mb-6 bg-slate-700 hover:bg-slate-600 px-5 py-2 rounded-lg"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-4xl font-bold mb-8">Reports & Analytics</h1>

      {loading ? (
        <div className="p-6">Loading reports...</div>
      ) : error ? (
        <div className="p-6 text-red-400">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-[#1e293b] rounded-xl p-6 shadow-lg">
              <h2 className="text-gray-400">Total Shipments</h2>
              <p className="text-4xl font-bold mt-3">{totalShipments}</p>
            </div>

            <div className="bg-[#1e293b] rounded-xl p-6 shadow-lg">
              <h2 className="text-gray-400">Completed Deliveries</h2>
              <p className="text-4xl font-bold mt-3 text-green-400">{completedDeliveries}</p>
            </div>

            <div className="bg-[#1e293b] rounded-xl p-6 shadow-lg">
              <h2 className="text-gray-400">Active Vehicles</h2>
              <p className="text-4xl font-bold mt-3 text-cyan-400">{activeVehicles}</p>
            </div>

            <div className="bg-[#1e293b] rounded-xl p-6 shadow-lg">
              <h2 className="text-gray-400">Pending Orders</h2>
              <p className="text-4xl font-bold mt-3 text-yellow-400">{pendingOrders}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-10">
            <div className="bg-[#1e293b] p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-5">Weekly Shipments</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={shipmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip />
                  <Bar dataKey="shipments" fill="#06b6d4" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-[#1e293b] p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-5">Driver Status</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={driverData} dataKey="value" nameKey="name" outerRadius={100} label>
                    {driverData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#1e293b] rounded-xl p-6 mb-10">
            <h2 className="text-2xl font-semibold mb-5">Recent Reports</h2>
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-600">
                  <th className="py-3">Report</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="py-4">Weekly Shipment Report</td>
                  <td>{new Date().toLocaleDateString()}</td>
                  <td className="text-green-400">Ready</td>
                </tr>

                <tr className="border-b border-gray-700">
                  <td className="py-4">Monthly Vehicle Report</td>
                  <td>{new Date().toLocaleDateString()}</td>
                  <td className="text-green-400">Ready</td>
                </tr>

                <tr>
                  <td className="py-4">Driver Performance Report</td>
                  <td>{new Date().toLocaleDateString()}</td>
                  <td className="text-yellow-400">Processing</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex gap-4">
            <button className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-lg">📄 Export PDF</button>
            <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg">📊 Export Excel</button>
            <button className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-lg text-black font-semibold">📥 Download CSV</button>
          </div>
        </>
      )}
    </div>
  );
}

export default ReportsAnalytics;