import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const DriverProfile = () => {
  const navigate = useNavigate();

  const [driver, setDriver] = useState({
    name: "",
    email: "",
    phone: "",
    licenseNumber: "",
  });

// useEffect(() => {
//   const fetchDriver = async () => {
//     try {
//       const driverId = localStorage.getItem("driverId");

//       const response = await axios.get(
//         `http://localhost:5000/api/driver/profile/${driverId}`
//       );

//       setDriver(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   fetchDriver();
// }, []);

  const handleLogout = () => {
    localStorage.removeItem("driverToken");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-900 border-r border-slate-800 p-6">
        <h1 className="text-2xl font-bold mb-10">🚚 Driver Panel</h1>

        <nav className="space-y-3">
          <button onClick={() => navigate("/driverdashboard")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl">🏠 Dashboard</button>
          <button onClick={() => navigate("/driverdeliveries")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl">📦 My Deliveries</button>
          <button onClick={() => navigate("/navigation")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl">🧭 Route Navigation</button>
          <button onClick={() => navigate("/vehiclestatus")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl">🚗 Vehicle Status</button>
          <button onClick={() => navigate("/report-issue")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl">🛠 Vehicle Issue Report</button>
          <button onClick={() => navigate("/drivernotifications")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl">🔔 Notifications</button>
          <button onClick={() => navigate("/profile")}className="w-full text-left bg-indigo-600 p-3 rounded-xl">👤 Driver Profile</button>
        </nav>

        <button onClick={handleLogout} className="absolute bottom-6 left-6 right-6 text-left bg-red-500/10 text-red-400 hover:bg-red-600 hover:text-white p-3 rounded-xl">
          🚪 Logout
        </button>
      </aside>

      <main className="ml-72 p-8">
        <h2 className="text-4xl font-bold mb-2">Driver Profile</h2>
        <p className="text-slate-400 mb-8">Personal and vehicle details</p>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl max-w-4xl">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-4xl">
              👤
            </div>

            <div>
              <h3 className="text-3xl font-bold">{driver.name}</h3>
              <p className="text-slate-400">Driver ID: DRV1024</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="bg-slate-800 rounded-2xl p-5">
              <p className="text-slate-400">Email</p>
              <h4 className="font-semibold mt-1">{driver.email}</h4>
            </div>

            <div className="bg-slate-800 rounded-2xl p-5">
              <p className="text-slate-400">Phone</p>
              <h4 className="font-semibold mt-1">{driver.phone}</h4>
            </div>

            <div className="bg-slate-800 rounded-2xl p-5">
              <p className="text-slate-400">Assigned Vehicle</p>
              <h4 className="font-semibold mt-1">KL-01-AB-2345</h4>
            </div>

            <div className="bg-slate-800 rounded-2xl p-5">
              <p className="text-slate-400">License Number</p>
              <h4 className="font-semibold mt-1">{driver.licenseNumber}</h4>
            </div>
          </div>

          <button className="mt-8 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-semibold">
            Edit Profile
          </button>
        </div>
      </main>
    </div>
  );
};

export default DriverProfile;