import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VehicleStatus = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Available");

  const handleLogout = () => {
    localStorage.removeItem("driverToken");
    navigate("/");
  };

  const handleUpdate = () => {
    alert(`Vehicle status updated to ${status}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-900 border-r border-slate-800 p-6">
        <h1 className="text-2xl font-bold mb-10">🚚 Driver Panel</h1>

        <nav className="space-y-3">
          <button onClick={() => navigate("/driver")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"> Dashboard</button>
          <button onClick={() => navigate("/driverdeliveries")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"> My Deliveries</button>
          <button onClick={() => navigate("/navigation")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"> Route Navigation</button>
          <button className="w-full text-left bg-indigo-600 p-3 rounded-xl"> Vehicle Status</button>
          <button onClick={() => navigate("/report-issue")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"> Vehicle Issue Report</button>
          <button onClick={() => navigate("/drivernotifications")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"> Notifications</button>
          <button onClick={() => navigate("/driver/profile")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"> Driver Profile</button>
        </nav>

        <button onClick={handleLogout} className="absolute bottom-6 left-6 right-6 text-left bg-red-500/10 text-red-400 hover:bg-red-600 hover:text-white p-3 rounded-xl">
          🚪 Logout
        </button>
      </aside>

      <main className="ml-72 p-8">
        <h2 className="text-4xl font-bold mb-2">Vehicle Status</h2>
        <p className="text-slate-400 mb-8">Update current vehicle availability</p>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl max-w-xl">
          <p className="text-slate-400 mb-2">Vehicle Number</p>
          <h3 className="text-2xl font-bold mb-6">KL-01-AB-2345</h3>

          <label className="text-slate-400">Select Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full mt-3 bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none"
          >
            <option>Available</option>
            <option>On Delivery</option>
            <option>Under Maintenance</option>
            <option>Break</option>
            <option>Offline</option>
          </select>

          <div className="mt-6 bg-slate-800 rounded-2xl p-5">
            Current Status:
            <span className="ml-2 text-green-400 font-semibold">{status}</span>
          </div>

          <button
            onClick={handleUpdate}
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-semibold"
          >
            Update Status
          </button>
        </div>
      </main>
    </div>
  );
};

export default VehicleStatus;