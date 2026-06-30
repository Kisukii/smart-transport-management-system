import { Outlet, useNavigate, useLocation } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const buttonClass = (path) =>
    `w-full text-left p-3 rounded-xl transition-colors ${
      location.pathname === path
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950/40 font-medium"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-900/95 border-r border-slate-800 p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-10 tracking-tight">
          Admin Panel
        </h1>

        <nav className="space-y-2 flex-1 overflow-y-auto">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className={buttonClass("/admin/dashboard")}
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/admin/profile")}
            className={buttonClass("/admin/profile")}
          >
            Profile
          </button>

          <button
            onClick={() => navigate("/admin/drivers")}
            className={buttonClass("/admin/drivers")}
          >
            Driver Management
          </button>

          <button
            onClick={() => navigate("/admin/vehicles")}
            className={buttonClass("/admin/vehicles")}
          >
            Vehicle Management
          </button>

          <button
            onClick={() => navigate("/admin/orders")}
            className={buttonClass("/admin/orders")}
          >
            Order Management
          </button>

          <button
            onClick={() => navigate("/admin/customers")}
            className={buttonClass("/admin/customers")}
          >
            Customer Management
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
}

export default AdminLayout;