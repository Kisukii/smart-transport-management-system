import { useState } from "react";
import DriverManagement from "./DriverManagement";
import VehicleManagement from "./VehicleManagement";

function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  // Navigation Pages
  if (activePage === "drivers") {
    return (
      <DriverManagement
        goBack={() => setActivePage("dashboard")}
      />
    );
  }

  if (activePage === "vehicles") {
    return (
      <VehicleManagement
        goBack={() => setActivePage("dashboard")}
      />
    );
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

          <li
            className="cursor-pointer hover:text-cyan-400"
            onClick={() => setActivePage("dashboard")}
          >
            Dashboard
          </li>

          <li
            className="cursor-pointer hover:text-cyan-400"
            onClick={() => setActivePage("drivers")}
          >
            Driver Management
          </li>

          <li
            className="cursor-pointer hover:text-cyan-400"
            onClick={() => setActivePage("vehicles")}
          >
            Vehicle Management
          </li>

          <li
            className="cursor-pointer hover:text-cyan-400"
          >
            Manager Management
          </li>

          <li
            className="cursor-pointer hover:text-cyan-400"
          >
            User Management
          </li>

          <li
            className="cursor-pointer text-red-400 hover:text-red-300"
            onClick={handleLogout}
          >
            Logout
          </li>

        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          Admin Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-5">

          <div className="bg-[#1e293b] p-5 rounded-2xl">
            <h2>Total Vehicles</h2>
            <p className="text-3xl font-bold mt-2">
              25
            </p>
          </div>

          <div className="bg-[#1e293b] p-5 rounded-2xl">
            <h2>Total Drivers</h2>
            <p className="text-3xl font-bold mt-2">
              18
            </p>
          </div>

          <div className="bg-[#1e293b] p-5 rounded-2xl">
            <h2>Total Managers</h2>
            <p className="text-3xl font-bold mt-2">
              5
            </p>
          </div>

          <div className="bg-[#1e293b] p-5 rounded-2xl">
            <h2>Active Vehicles</h2>
            <p className="text-3xl font-bold mt-2">
              20
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
              className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-xl"
            >
              Manage Drivers
            </button>

            <button
              onClick={() => setActivePage("vehicles")}
              className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-xl"
            >
              Manage Vehicles
            </button>

            <button
              className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-xl"
            >
              Manage Managers
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;