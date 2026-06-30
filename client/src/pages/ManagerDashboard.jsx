import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ManagerDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    shipments: 0,
    vehicles: 0,
    drivers: 0,
    pendingRequests: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = token
          ? { Authorization: `Bearer ${token}` }
          : {};

        const [ordersRes, requestsRes, driversRes, vehiclesRes] =
          await Promise.all([
            axios
              .get("http://localhost:5000/api/orders", { headers })
              .catch(() => ({ data: [] })),
            axios
              .get("http://localhost:5000/api/orderrequests", { headers })
              .catch(() => ({ data: [] })),
            axios
              .get("http://localhost:5000/api/drivers", { headers })
              .catch(() => ({ data: [] })),
            axios
              .get("http://localhost:5000/api/vehicles", { headers })
              .catch(() => ({ data: [] })),
          ]);

        const orders = Array.isArray(ordersRes.data)
          ? ordersRes.data
          : ordersRes.data.orders || ordersRes.data.data || [];
        const requests = Array.isArray(requestsRes.data)
          ? requestsRes.data
          : requestsRes.data.requests || requestsRes.data.data || [];
        const drivers = Array.isArray(driversRes.data)
          ? driversRes.data
          : driversRes.data.drivers || driversRes.data.data || [];
        const vehicles = Array.isArray(vehiclesRes.data)
          ? vehiclesRes.data
          : vehiclesRes.data.vehicles || vehiclesRes.data.data || [];

        const activeVehicleCount = vehicles.filter((vehicle) => {
          const status = (vehicle.status || "").toLowerCase();
          return status === "available" || status === "active" || !status;
        }).length;

        const pendingRequestCount = requests.filter(
          (request) =>
            (request.status || "Pending").toLowerCase() === "pending"
        ).length;

        setStats({
          shipments: orders.length,
          vehicles: activeVehicleCount,
          drivers: drivers.length,
          pendingRequests: pendingRequestCount,
        });
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || err.message || "Unable to load dashboard stats.");
      } finally {
        setLoading(false);
      }
    };

    loadCounts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white text-2xl">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white text-2xl">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-8 shadow-2xl flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">👨‍💼 Manager Dashboard</h1>

          <p className="text-cyan-100 mt-2">
            Monitor shipments, assign drivers, manage vehicles and oversee
            transport operations.
          </p>
        </div>

        
      </div>

      {/* Dashboard Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:scale-105 transition">
          <p className="text-slate-400">Total Shipments</p>
          <h2 className="text-4xl font-bold mt-3">{stats.shipments}</h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:scale-105 transition">
          <p className="text-slate-400">Active Vehicles</p>
          <h2 className="text-4xl font-bold mt-3 text-green-400">{stats.vehicles}</h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:scale-105 transition">
          <p className="text-slate-400">Active Drivers</p>
          <h2 className="text-4xl font-bold mt-3 text-cyan-400">{stats.drivers}</h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:scale-105 transition">
          <p className="text-slate-400">Pending Requests</p>
          <h2 className="text-4xl font-bold mt-3 text-yellow-400">{stats.pendingRequests}</h2>
        </div>

      </div>

      {/* Quick Actions */}

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-6">
          Quick Actions
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">

          

          
          
          <button
            onClick={() => navigate("/manager/orders")}
            className= "bg-slate-800 hover:bg-indigo-600 p-4 rounded-2xl"
          >
            📦 View Shipments
          </button>

          
          

          <button
            onClick={() => navigate("/manager/tracking")}
            className=" bg-slate-800 hover:bg-indigo-600 p-4 rounded-2xl"
          >
            📍 Vehicle Tracking
          </button>

          <button
            onClick={() => navigate("/manager/reports")}
            className=" bg-slate-800 hover:bg-indigo-600 p-4 rounded-2xl"
          >
            📊 Reports
          </button>

        </div>
      </div>
    </>
  );
}