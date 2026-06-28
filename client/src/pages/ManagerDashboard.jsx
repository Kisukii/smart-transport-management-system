import { useState } from "react";

import DriverManagement from "./DriverManagement";
import VehicleManagement from "./VehicleManagement";
import OrdersManagement from "./OrdersManagement";
import VehicleTracking from "./VehicleTracking";
import NewOrder from "./NewOrder";
import ReportsAnalytics from "./ReportsAnalytics";

function ManagerDashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  // Navigation Pages
  if (activePage === "drivers") {
    return <DriverManagement goBack={() => setActivePage("dashboard")} />;
  }

  if (activePage === "vehicles") {
    return <VehicleManagement goBack={() => setActivePage("dashboard")} />;
  }

  if (activePage === "orders") {
    return <OrdersManagement goBack={() => setActivePage("dashboard")} />;
  }

  if (activePage === "tracking") {
    return <VehicleTracking goBack={() => setActivePage("dashboard")} />;
  }

  if (activePage === "neworder") {
    return <NewOrder goBack={() => setActivePage("dashboard")} />;
  
  }
  if (activePage === "reports") {
    return <ReportsAnalytics goBack={() => setActivePage("dashboard")} />;
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
          🚛 Transport Manager Panel
        </h1>

        <ul className="space-y-5 text-lg">


          <li
            className="cursor-pointer hover:text-cyan-400"
            onClick={() => setActivePage("dashboard")}
          >
            Dashboard
          </li>

          <li
            className="cursor-pointer hover:text-cyan-400"
            onClick={() => setActivePage("neworder")}
          >
            New Transport Request
          </li>

          <li
            className="cursor-pointer hover:text-cyan-400"
            onClick={() => setActivePage("orders")}
          >
            All Shipments
          </li>

          <li
            className="cursor-pointer hover:text-cyan-400"
            onClick={() => setActivePage("tracking")}
          >
            Vehicle Tracking
          </li>

          <li
            className="cursor-pointer hover:text-cyan-400"
            onClick={() => setActivePage("vehicles")}
          >
            Fleet Management
          </li>

          <li
            className="cursor-pointer hover:text-cyan-400"
            onClick={() => setActivePage("drivers")}
          >
            Driver Management
          </li>

          <li
            className="cursor-pointer hover:text-cyan-400"
            onClick={() => setActivePage("reports")}
          >
            Reports & Analytics
          </li>

          <li className="cursor-pointer hover:text-cyan-400">
            Settings
          </li>

          <li
            onClick={handleLogout}
            className="cursor-pointer text-red-400 hover:text-red-300"
          >
            Logout
          </li>

        </ul>
      </div>

      {/* Main */}
      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          👨‍💼 Manager Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-5">

          <div className="bg-[#1e293b] p-5 rounded-2xl hover:scale-105 transition">
            <h2>Total Shipments</h2>
            <p className="text-3xl font-bold mt-2">128</p>
          </div>

          <div className="bg-[#1e293b] p-5 rounded-2xl hover:scale-105 transition">
            <h2>Active Vehicles</h2>
            <p className="text-3xl font-bold mt-2">42</p>
          </div>

          <div className="bg-[#1e293b] p-5 rounded-2xl hover:scale-105 transition">
            <h2>Active Drivers</h2>
            <p className="text-3xl font-bold mt-2">18</p>
          </div>

          <div className="bg-[#1e293b] p-5 rounded-2xl hover:scale-105 transition">
            <h2>Pending Requests</h2>
            <p className="text-3xl font-bold mt-2">7</p>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="mt-10">

          <h2 className="text-2xl font-semibold mb-5">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-4">

            <button
              onClick={() => setActivePage("neworder")}
              className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-xl transition"
            >
              ➕ New Request
            </button>

            <button
              onClick={() => setActivePage("orders")}
              className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-xl transition"
            >
              📦 View Shipments
            </button>

            <button
              onClick={() => setActivePage("drivers")}
              className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-xl transition"
            >
              👨‍✈️ Driver Management
            </button>

            <button
              onClick={() => setActivePage("reports")}
              className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-xl"
            >
            📊 Reports
            </button>

            <button
              onClick={() => setActivePage("vehicles")}
              className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-xl transition"
            >
              🚚 Fleet Management
            </button>

            <button
              onClick={() => setActivePage("tracking")}
              className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-xl transition"
            >
              📍 Vehicle Tracking
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ManagerDashboard;