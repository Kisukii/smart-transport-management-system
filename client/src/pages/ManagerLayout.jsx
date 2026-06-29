import { Outlet, useNavigate, useLocation } from "react-router-dom";

const ManagerLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const buttonStyle = (path) =>
    `w-full text-left p-3 rounded-xl transition-colors ${
      location.pathname === path
        ? "bg-cyan-600 text-white shadow-lg shadow-cyan-950/40 font-medium"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-900/95 border-r border-slate-800 p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-10 tracking-tight">
          🚛 Transport Manager Panel
        </h1>

        <nav className="space-y-2 flex-1 overflow-y-auto">
          <button
            onClick={() => navigate("/manager")}
            className={`w-full text-left p-3 rounded-xl transition-colors ${
              location.pathname === "/manager"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950/40 font-medium"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/manager/new-order")}
            className={`w-full text-left p-3 rounded-xl transition-colors ${
              location.pathname === "/manager/new-order"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950/40 font-medium"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            New Transportation Request
          </button>

          
          

          <button
            onClick={() => navigate("/manager/order-requests")}
            className={`w-full text-left p-3 rounded-xl transition-colors ${
              location.pathname === "/manager/order-requests"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950/40 font-medium"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            Order Requests
            </button>

          <button
            onClick={() => navigate("/manager/assign-order")}
            className={`w-full text-left p-3 rounded-xl transition-colors ${
              location.pathname === "/manager/assign-order"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950/40 font-medium"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            Assign Order
          </button>

          <button
            onClick={() => navigate("/manager/orders")}
            className={`w-full text-left p-3 rounded-xl transition-colors ${
              location.pathname === "/manager/orders"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950/40 font-medium"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            All Shipments
          </button>
          
          <button
            onClick={() => navigate("/manager/tracking")}
            className={`w-full text-left p-3 rounded-xl transition-colors ${
              location.pathname === "/manager/tracking"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950/40 font-medium"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            Vehicle Tracking
          </button>

         <button
            onClick={() => navigate("/manager/vehicles")}
            className={`w-full text-left p-3 rounded-xl transition-colors ${
              location.pathname === "/manager/vehicles"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950/40 font-medium"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
                Vehicle Management
          </button>

         <button
            onClick={() => navigate("/manager/drivers")}
            className={`w-full text-left p-3 rounded-xl transition-colors ${
              location.pathname === "/manager/drivers"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950/40 font-medium"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            Driver Management
          </button>
          <button
            onClick={() => navigate("/manager/reports")}
            className={`w-full text-left p-3 rounded-xl transition-colors ${
              location.pathname === "/manager/reports"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950/40 font-medium"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            Reports & Analytics
          </button>

           <button
            onClick={() => navigate("/manager/settings")}
            className={`w-full text-left p-3 rounded-xl transition-colors ${
              location.pathname === "/manager/settings"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950/40 font-medium"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            Settings
          </button>
          
          
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500/10 text-red-400 hover:bg-red-600 hover:text-white p-3 rounded-xl transition-colors font-medium"
        >
          Logout
        </button>
      </aside>

      <main className="ml-72">
        <div className="px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ManagerLayout;