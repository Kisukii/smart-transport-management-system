import { useNavigate } from "react-router-dom";

export default function ManagerDashboard() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

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

        <div>
          <button
            onClick={handleLogout}
            className="bg-white text-indigo-700 font-semibold px-4 py-2 rounded-2xl shadow hover:opacity-90"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Dashboard Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:scale-105 transition">
          <p className="text-slate-400">Total Shipments</p>
          <h2 className="text-4xl font-bold mt-3">128</h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:scale-105 transition">
          <p className="text-slate-400">Active Vehicles</p>
          <h2 className="text-4xl font-bold mt-3 text-green-400">42</h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:scale-105 transition">
          <p className="text-slate-400">Active Drivers</p>
          <h2 className="text-4xl font-bold mt-3 text-cyan-400">18</h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:scale-105 transition">
          <p className="text-slate-400">Pending Requests</p>
          <h2 className="text-4xl font-bold mt-3 text-yellow-400">7</h2>
        </div>

      </div>

      {/* Quick Actions */}

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-6">
          Quick Actions
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">

          <button
            onClick={() => navigate("/manager/new-order")}
            className=" bg-slate-800 hover:bg-indigo-600 p-4 rounded-2xl"
          >
            ➕ New Request
          </button>

          
          
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