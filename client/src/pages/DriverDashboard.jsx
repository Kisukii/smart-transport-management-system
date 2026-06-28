import { useNavigate } from "react-router-dom";

const DriverDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("driverToken");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-900/95 border-r border-slate-800 p-6">
        <h1 className="text-2xl font-bold mb-10">🚚 Driver Panel</h1>

        <nav className="space-y-3">
          <button className="w-full text-left bg-indigo-600 p-3 rounded-xl shadow-lg">
             Dashboard
          </button>

          <button onClick={() => navigate("/driverdeliveries")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl">
             My Deliveries
          </button>

          <button onClick={() => navigate("/navigation")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl">
             Route Navigation
          </button>
        
          <button onClick={() => navigate("/vehiclestatus")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl">
            Vehicle Status
          </button>

          <button onClick={() => navigate("/report-issue")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl">
             Vehicle Issue Report
          </button>

          <button onClick={() => navigate("/drivernotifications")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl">
             Notifications
          </button>

          <button onClick={() => navigate("/profile", { state: { from: "/driver" } })} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl">
             Driver Profile
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="absolute bottom-6 left-6 right-6 text-left bg-red-500/10 text-red-400 hover:bg-red-600 hover:text-white p-3 rounded-xl"
        >
           Logout
        </button>
      </aside>

      {/* Main */}
      <main className="ml-72 p-8">
        {/* Header */}
        {/* <div className="mb-8 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-4xl font-bold">Welcome back, Driver </h2> */}

          {/* <p className="text-indigo-100 mt-2">
            Manage your deliveries, vehicle status, and route details here.
          </p>
        </div> */}

        

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:scale-105 transition">
            <p className="text-slate-400">Today’s Deliveries</p>
            <h3 className="text-4xl font-bold mt-3">6</h3>
            <p className="text-green-400 text-sm mt-2">+2 new assigned</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:scale-105 transition">
            <p className="text-slate-400">Completed</p>
            <h3 className="text-4xl font-bold mt-3 text-green-400">3</h3>
            <p className="text-slate-500 text-sm mt-2">Finished today</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:scale-105 transition">
            <p className="text-slate-400">Pending</p>
            <h3 className="text-4xl font-bold mt-3 text-yellow-400">3</h3>
            <p className="text-slate-500 text-sm mt-2">Needs action</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:scale-105 transition">
            <p className="text-slate-400">Vehicle Status</p>
            <h3 className="text-2xl font-bold mt-3 text-cyan-400">Available</h3>
            <p className="text-slate-500 text-sm mt-2">KL-01-AB-2345</p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Current Delivery */}
          <div className="col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Current Delivery</h3>
              <span className="bg-yellow-500/10 text-yellow-400 px-4 py-2 rounded-full text-sm">
                In Progress
              </span>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="bg-slate-800 rounded-2xl p-5">
                <p className="text-slate-400 text-sm">Customer</p>
                <h4 className="text-lg font-semibold mt-1">Rahul Nair</h4>
              </div>

              <div className="bg-slate-800 rounded-2xl p-5">
                <p className="text-slate-400 text-sm">Estimated Time</p>
                <h4 className="text-lg font-semibold mt-1">45 minutes</h4>
              </div>

              <div className="bg-slate-800 rounded-2xl p-5">
                <p className="text-slate-400 text-sm">Pickup</p>
                <h4 className="text-lg font-semibold mt-1">Warehouse A, Kochi</h4>
              </div>

              <div className="bg-slate-800 rounded-2xl p-5">
                <p className="text-slate-400 text-sm">Drop</p>
                <h4 className="text-lg font-semibold mt-1">MG Road, Ernakulam</h4>
              </div>
            </div>

            <button
              onClick={() => navigate("/navigation")}
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-semibold"
            >
              View Route Details
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h3 className="text-2xl font-bold mb-5">Quick Actions</h3>

            <div className="space-y-4">
              <button onClick={() => navigate("/driverdeliveries")} className="w-full bg-slate-800 hover:bg-indigo-600 p-4 rounded-2xl text-left">
                 View Deliveries
              </button>

              <button onClick={() => navigate("/vehiclestatus")} className="w-full bg-slate-800 hover:bg-indigo-600 p-4 rounded-2xl text-left">
                 Update Vehicle Status
              </button>

              <button onClick={() => navigate("/report-issue")} className="w-full bg-slate-800 hover:bg-indigo-600 p-4 rounded-2xl text-left">
                 Report Vehicle Issue
              </button>

              <button onClick={() => navigate("/drivernotifications")} className="w-full bg-slate-800 hover:bg-indigo-600 p-4 rounded-2xl text-left">
                 Check Notifications
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-2 gap-6 mt-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Delivery Progress</h3>
            <div className="w-full bg-slate-800 rounded-full h-4">
              <div className="bg-indigo-600 h-4 rounded-full w-1/2"></div>
            </div>
            <p className="text-slate-400 mt-3">3 out of 6 deliveries completed</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Recent Alert</h3>
            <p className="text-slate-300">
              New delivery assigned to MG Road, Ernakulam. Please check route details before starting.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DriverDashboard;