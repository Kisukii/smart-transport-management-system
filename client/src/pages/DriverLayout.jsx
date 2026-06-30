import { Outlet, useNavigate, useLocation } from "react-router-dom";
 
const DriverLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
 
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/");
  };
 
  const navItem = (path, label) => (
    <button
      onClick={() => navigate(path)}
      className={`w-full text-left p-3 rounded-xl transition-colors ${
        location.pathname === path
          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950/40 font-medium"
          : "text-slate-300 hover:bg-slate-800 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
 
  return (
    <div className="min-h-screen bg-slate-950 text-white">
 
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-900/95 border-r border-slate-800 p-6 flex flex-col">
 
        <h1 className="text-2xl font-bold mb-10 tracking-tight">
          🚚 Driver Panel 
        </h1>

 
         <nav className="space-y-2">
           {navItem("/driver/new-orders", "New Order Requests")}
           {navItem("/driverdeliveries", "My Deliveries")}
           {navItem("/navigation", "Route Navigation")}
           {navItem("/driverstatus", "Driver Status")} 
        {navItem("/driver/profile", "Driver Profile")}


        {/* <nav className="space-y-3">

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
            onClick={() => navigate("/driverstatus")}
            className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"
          >
            Driver Status
          </button>

          <button
            onClick={() => navigate("/report-issue")}
            className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"
          >
            Vehicle Issue Report
          </button>

          {/* <button
            onClick={() => navigate("/drivernotifications")}
            className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"
          >
            Notifications
          </button> */}

          {/* <button
            onClick={() => navigate("/profile")}
            className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"
          >
            Driver Profile
          </button>
 */} 

        </nav>
 
        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500/10 text-red-400 hover:bg-red-600 hover:text-white p-3 rounded-xl transition-colors font-medium"
        >
          Logout
        </button>
 
      </aside>
 
      {/* Every page appears here */}
      <main className="ml-72">
        <div className="px-6 py-8">
          <Outlet />
        </div>
      </main>
 
    </div>
  );
};
 
export default DriverLayout;