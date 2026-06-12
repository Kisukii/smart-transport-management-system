import { useState } from "react";
import Pipeline from "./Pipeline";
import MyOrders from "./MyOrders";
import Analytics from "./Analytics";

function Dashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  if (activePage === "pipeline") {
    return <Pipeline goBack={() => setActivePage("dashboard")} />;
  }
  if (activePage === "orders") {
    return <MyOrders goBack={() => setActivePage("dashboard")} />;
  }
  if (activePage === "analytics") {
    return <Analytics goBack={() => setActivePage("dashboard")} />;
  }

  return (
    <div className="flex h-screen bg-[#0f172a] text-white">

      {/* Sidebar */}
      <div className="w-64 bg-[#1e293b] p-6">
        <h1 className="text-3xl font-bold mb-10">Vehicle Tracking System</h1>

        <ul className="space-y-5 text-lg">
          <li
            className="cursor-pointer hover:text-cyan-400"
            onClick={() => setActivePage("dashboard")}
          >
            Dashboard
          </li>

          <li
            className="cursor-pointer hover:text-cyan-400"
            onClick={() => setActivePage("pipeline")}
          >
            Pipeline
          </li>

          <li
            className="cursor-pointer hover:text-cyan-400"
            onClick={() => setActivePage("orders")}
          >
            My Orders
          </li>

          <li
            className="cursor-pointer hover:text-cyan-400"
            onClick={() => setActivePage("analytics")}
          >
            Analytics
          </li>

          <li>Settings</li>
        </ul>
      </div>

      {/* Main */}
      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-5">

          <div className="bg-[#1e293b] p-5 rounded-2xl hover:scale-105 transition">
            <h2>Total Leads</h2>
            <p className="text-3xl font-bold mt-2">128</p>
          </div>

          <div className="bg-[#1e293b] p-5 rounded-2xl hover:scale-105 transition">
            <h2>Revenue</h2>
            <p className="text-3xl font-bold mt-2">₹4.2L</p>
          </div>

          <div className="bg-[#1e293b] p-5 rounded-2xl hover:scale-105 transition">
            <h2>Conversion Rate</h2>
            <p className="text-3xl font-bold mt-2">24%</p>
          </div>

          <div className="bg-[#1e293b] p-5 rounded-2xl hover:scale-105 transition">
            <h2>Active Deals</h2>
            <p className="text-3xl font-bold mt-2">12</p>
          </div>

        </div>

        {/* Buttons + Activity Section */}
        <div className="grid grid-cols-2 gap-8 mt-10">

          {/* LEFT - Buttons */}
          <div className="flex gap-4">

            <button
              onClick={() => setActivePage("orders")}
              className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl transition"
            >
              Go to My Orders
            </button>

            <button
              onClick={() => setActivePage("pipeline")}
              className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl transition"
            >
              View Pipeline
            </button>

          </div>

          {/* RIGHT - Recent Activity */}
          <div className="bg-[#1e293b] p-6 rounded-2xl">

            <h2 className="text-xl font-semibold mb-4">
              Recent Activity
            </h2>

            <ul className="space-y-3">

              <li className="bg-slate-700 p-3 rounded-lg hover:bg-slate-600 transition">
                Tesla moved to Contacted
              </li>

              <li className="bg-slate-700 p-3 rounded-lg hover:bg-slate-600 transition">
                Amazon moved to Proposal
              </li>

              <li className="bg-slate-700 p-3 rounded-lg hover:bg-slate-600 transition">
                New lead added: Spotify
              </li>

            </ul>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;