import { useNavigate } from 'react-router-dom';

export default function ManagerDashboard() {
  const navigate = useNavigate();

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
          onClick={() => navigate("/dashboard")}
        >
          Manager Dashboard
        </li>

        <li
          className="cursor-pointer hover:text-cyan-400"
          onClick={() => navigate("/profile")}
        >
          Profile
        </li>

        <li
          className="cursor-pointer hover:text-cyan-400"
          onClick={() => navigate("/neworder")}
        >
          New Transport Request
        </li>

        <li
          className="cursor-pointer hover:text-cyan-400"
          onClick={() => navigate("/orders")}
        >
          All Shipments
        </li>

        <li
          className="cursor-pointer hover:text-cyan-400"
          onClick={() => navigate("/tracking")}
        >
          Live Tracking
        </li>

        <li
          className="cursor-pointer hover:text-cyan-400"
          onClick={() => navigate("/vehicles")}
        >
          Fleet Management
        </li>

        <li
          className="cursor-pointer hover:text-cyan-400"
          onClick={() => navigate("/drivers")}
        >
          Driver Management
        </li>

        <li className="cursor-pointer hover:text-cyan-400">
          Settings
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

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-8 mt-10">

        <div className="flex gap-4">

          <button
            onClick={() => navigate("/orders")}
            className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl transition"
          >
            View Shipments
          </button>

          <button
            onClick={() => navigate("/drivers")}
            className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl transition"
          >
            Manage Drivers
          </button>

          <button
            onClick={() => navigate("/vehicles")}
            className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl transition"
          >
            Fleet Status
          </button>

        </div>

      </div>

    </div>
  </div>
  );
}