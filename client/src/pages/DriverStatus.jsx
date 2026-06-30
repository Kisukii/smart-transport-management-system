import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DriverStatus = () => {
  const navigate = useNavigate();

  const [driver, setDriver] = useState({});
  const [status, setStatus] = useState("Available");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDriver();
  }, []);

  const fetchDriver = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/drivers/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDriver(res.data);
      setStatus(res.data.status || "Available");
    } catch (err) {
      console.log(err);
      alert("Failed to load driver profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:5000/api/drivers/status",
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Status updated successfully!");
      fetchDriver();
    } catch (err) {
      console.log(err);
      alert(
        err.response?.data?.message || "Failed to update driver status"
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const statusColor = {
    Available: "bg-green-500/20 text-green-400",
    "On Delivery": "bg-blue-500/20 text-blue-400",
    "On Break": "bg-yellow-500/20 text-yellow-400",
    Offline: "bg-gray-500/20 text-gray-400",
    Unavailable: "bg-red-500/20 text-red-400",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-900 border-r border-slate-800 p-6">

        <h1 className="text-2xl font-bold mb-10">
          🚚 Driver Panel
        </h1>

        <nav className="space-y-3">

          <button
            onClick={() => navigate("/driver-dashboard")}
            className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/driver/new-orders")}
            className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"
          >
            New Orders
          </button>

          <button
            onClick={() => navigate("/driverdeliveries")}
            className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"
          >
            My Deliveries
          </button>

          <button
            onClick={() => navigate("/navigation")}
            className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"
          >
            Route Navigation
          </button>

          <button
            className="w-full text-left bg-indigo-600 p-3 rounded-xl"
          >
            Driver Status
          </button>

          <button
            onClick={() => navigate("/report-issue")}
            className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"
          >
            Vehicle Issue Report
          </button>

          <button
            onClick={() => navigate("/drivernotifications")}
            className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"
          >
            Notifications
          </button>

          <button
            onClick={() => navigate("/driver/profile")}
            className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"
          >
            Driver Profile
          </button>

        </nav>

        <button
          onClick={handleLogout}
          className="absolute bottom-6 left-6 right-6 bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white p-3 rounded-xl"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}

      <main className="ml-72 p-8">

        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-slate-800 hover:bg-slate-700 px-5 py-2 rounded-lg"
        >
          ← Back
        </button>

        <h2 className="text-4xl font-bold">
          Driver Status
        </h2>

        <p className="text-slate-400 mt-2 mb-8">
          Update your current availability.
        </p>

        <div className="max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">

          <div className="grid grid-cols-2 gap-6">

            <div>
              <p className="text-slate-400 mb-1">
                Driver Name
              </p>

              <h3 className="text-xl font-bold">
                {driver.name}
              </h3>
            </div>

            <div>
              <p className="text-slate-400 mb-1">
                Driver ID
              </p>

              <h3 className="text-xl font-bold">
                {driver.driverId}
              </h3>
            </div>

          </div>

          <div className="mt-8">

            <label className="text-slate-400">
              Select Availability
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full mt-3 bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none"
            >
              <option>Available</option>
              <option>On Delivery</option>
              <option>On Break</option>
              <option>Offline</option>
              <option>Unavailable</option>
            </select>

          </div>

          <div className="mt-8 bg-slate-800 rounded-2xl p-5 flex justify-between items-center">

            <span className="text-slate-300">
              Current Status
            </span>

            <span
              className={`px-4 py-2 rounded-full font-semibold ${
                statusColor[status]
              }`}
            >
              {status}
            </span>

          </div>

          <button
            onClick={handleUpdate}
            className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 py-4 rounded-xl font-semibold text-lg transition"
          >
            Update Status
          </button>

        </div>

      </main>
    </div>
  );
};

export default DriverStatus;