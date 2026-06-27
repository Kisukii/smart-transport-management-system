import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DriverManagement from "./DriverManagement";
import VehicleManagement from "./VehicleManagement";
import OrdersManagement from "./OrdersManagement";
import CustomerManagement from "./CustomerManagement";

function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const navigate = useNavigate();

  // ✅ NEW: driver data state
  const [drivers, setDrivers] = useState([]);

  const API = "http://localhost:5000/api/drivers";

  // ✅ NEW: fetch drivers from backend
  const loadDrivers = async () => {
    try {
      const res = await axios.get(API);
      setDrivers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadDrivers();
  }, []);

  // ✅ LIVE STATS (REPLACES STATIC VALUES)
  const totalDrivers = drivers.length;
  const availableDrivers = drivers.filter(
    (d) => d.status === "Available"
  ).length;

  const busyDrivers = drivers.filter(
    (d) => d.status === "Busy"
  ).length;

  const onLeaveDrivers = drivers.filter(
    (d) => d.status === "On Leave"
  ).length;

  // Navigation Pages
  if (activePage === "drivers") {
    return <DriverManagement goBack={() => setActivePage("dashboard")} />;
  }

  if (activePage === "vehicles") {
    return <VehicleManagement goBack={() => setActivePage("dashboard")} />;
  }
   if (activePage === "customer") {
    return <CustomerManagement goBack={() => setActivePage("dashboard")} />;
  }

  if (activePage === "orders") {
    return <OrdersManagement goBack={() => setActivePage("dashboard")} />;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen bg-[#0f172a] text-white">

      {/* Sidebar */}
      <div className="w-64 bg-[#1e293b] p-6">
        <h1 className="text-2xl font-bold mb-10">
          Vehicle Tracking System
        </h1>

        <ul className="space-y-5 text-lg">

          <li onClick={() => setActivePage("dashboard")}>Dashboard</li>

          <li className="cursor-pointer hover:text-cyan-400" onClick={() => navigate("/profile")}>
            Profile
          </li>

          <li onClick={() => setActivePage("drivers")}>
            Driver Management
          </li>
          <li onClick={() => setActivePage("vehicles")}>
            Vehicle Management
          </li>

          <li onClick={() => setActivePage("orders")}>
            Order Management
          </li>

          <li onClick={() => setActivePage("customer")}>Customer Management</li>

          <li onClick={handleLogout} className="text-red-400">
            Logout
          </li>

        </ul>
      </div>

      {/* Main */}
      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          Admin Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-5">

          <div className="bg-[#1e293b] p-5 rounded-2xl">
            <h2>Total Drivers</h2>
            <p className="text-3xl font-bold mt-2">{totalDrivers}</p>
          </div>

          <div className="bg-[#1e293b] p-5 rounded-2xl">
            <h2>Available</h2>
            <p className="text-3xl font-bold mt-2 text-green-400">
              {availableDrivers}
            </p>
          </div>

          <div className="bg-[#1e293b] p-5 rounded-2xl">
            <h2>Busy</h2>
            <p className="text-3xl font-bold mt-2 text-yellow-400">
              {busyDrivers}
            </p>
          </div>

          <div className="bg-[#1e293b] p-5 rounded-2xl">
            <h2>On Leave</h2>
            <p className="text-3xl font-bold mt-2 text-red-400">
              {onLeaveDrivers}
            </p>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="mt-10">

          <h2 className="text-2xl font-semibold mb-5">
            Quick Actions
          </h2>

          <div className="flex gap-4">

            <button
              onClick={() => setActivePage("drivers")}
              className="bg-cyan-600 px-6 py-3 rounded-xl"
            >
              Manage Drivers
            </button>

            <button
              onClick={() => setActivePage("vehicles")}
              className="bg-cyan-600 px-6 py-3 rounded-xl"
            >
              Manage Vehicles
            </button>

            <button className="bg-cyan-600 px-6 py-3 rounded-xl">
              Manage Managers
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;