import { Outlet, useNavigate } from "react-router-dom";

const DriverLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("driverToken");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-900/95 border-r border-slate-800 p-6">

        <h1 className="text-2xl font-bold mb-10">
          Driver Panel
        </h1>

        <nav className="space-y-3">

          <button
            onClick={() => navigate("/driver")}
            className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/driver/new-orders")}
            className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"
          >
            New Order Requests
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
            onClick={() => navigate("/vehiclestatus")}
            className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"
          >
            Vehicle Status
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
            onClick={() => navigate("/profile")}
            className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"
          >
            Driver Profile
          </button>

        </nav>

        <button
          onClick={handleLogout}
          className="absolute bottom-6 left-6 right-6 bg-red-500/10 text-red-400 hover:bg-red-600 hover:text-white p-3 rounded-xl"
        >
          Logout
        </button>

      </aside>

      {/* Every page appears here */}

      <main className="ml-72 p-8">
        <Outlet />
      </main>

    </div>
  );
};

export default DriverLayout;