import { Outlet, useNavigate } from "react-router-dom";

const ManagerLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("managerToken");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-900/95 border-r border-slate-800 p-6">
        <h1 className="text-2xl font-bold mb-10">Manager Panel</h1>

        <nav className="space-y-3">
          <button onClick={() => navigate("/manager")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl">
            Dashboard
          </button>

          <button onClick={() => navigate("/order-requests")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl">
            Order Requests
          </button>

          <button onClick={() => navigate("/assign-order")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl">
            Assign Order
          </button>

          <button onClick={() => navigate("/driver-management")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl">
            Driver Management
          </button>

          <button onClick={() => navigate("/vehicle-management")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl">
            Vehicle Management
          </button>

          <button
  onClick={() => navigate("/order-requests")}
  className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"
>
  Order Requests
</button>

<button
  onClick={() => navigate("/assign-order")}
  className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"
>
  Assign Order
</button>
        </nav>

        <button
          onClick={handleLogout}
          className="absolute bottom-6 left-6 right-6 bg-red-500/10 text-red-400 hover:bg-red-600 hover:text-white p-3 rounded-xl"
        >
          Logout
        </button>
      </aside>

      <main className="ml-72 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default ManagerLayout;