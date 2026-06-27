import { useNavigate } from "react-router-dom";

const RouteNavigation = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("driverToken");
    navigate("/");
  };

  const openGoogleMaps = () => {
    window.open(
      "https://www.google.com/maps/search/?api=1&query=MG Road Ernakulam",
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-900 border-r border-slate-800 p-6">
        <h1 className="text-2xl font-bold mb-10">🚚 Driver Panel</h1>

        <nav className="space-y-3">
          <button onClick={() => navigate("/driverdashboard")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"> Dashboard</button>
          <button onClick={() => navigate("/driverdeliveries")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"> My Deliveries</button>
          <button className="w-full text-left bg-indigo-600 p-3 rounded-xl"> Route Navigation</button>
          <button onClick={() => navigate("/vehiclestatus")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"> Vehicle Status</button>
          <button onClick={() => navigate("/report-issue")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl">Vehicle Issue Report</button>
          <button onClick={() => navigate("/drivernotifications")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"> Notifications</button>
          <button onClick={() => navigate("/driverprofile")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"> Driver Profile</button>
        </nav>

        <button onClick={handleLogout} className="absolute bottom-6 left-6 right-6 text-left bg-red-500/10 text-red-400 hover:bg-red-600 hover:text-white p-3 rounded-xl">
           Logout
        </button>
      </aside>

      <main className="ml-72 p-8">
        <h2 className="text-4xl font-bold mb-2">Route Navigation</h2>
        <p className="text-slate-400 mb-8">Simple route details without live map</p>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl max-w-4xl">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-2xl p-5">
              <p className="text-slate-400">Pickup Location</p>
              <h3 className="text-xl font-semibold mt-2">Warehouse A, Kochi</h3>
            </div>

            <div className="bg-slate-800 rounded-2xl p-5">
              <p className="text-slate-400">Drop Location</p>
              <h3 className="text-xl font-semibold mt-2">MG Road, Ernakulam</h3>
            </div>

            <div className="bg-slate-800 rounded-2xl p-5">
              <p className="text-slate-400">Distance</p>
              <h3 className="text-xl font-semibold mt-2">14 km</h3>
            </div>

            <div className="bg-slate-800 rounded-2xl p-5">
              <p className="text-slate-400">Estimated Time</p>
              <h3 className="text-xl font-semibold mt-2">45 minutes</h3>
            </div>
          </div>

          <div className="mt-8 bg-slate-800 rounded-2xl p-5">
            <h3 className="text-xl font-bold mb-3">Route Instructions</h3>
            <p className="text-slate-300">
              Start from Warehouse A, continue through NH road, take the city route,
              and proceed to MG Road delivery point.
            </p>
          </div>

          <button
            onClick={openGoogleMaps}
            className="mt-8 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-semibold"
          >
            Open in Google Maps
          </button>
        </div>
      </main>
    </div>
  );
};

export default RouteNavigation;