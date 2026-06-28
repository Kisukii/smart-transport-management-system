import { Outlet, useNavigate } from "react-router-dom";

const UserLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-900/95 border-r border-slate-800 p-6">
        <h1 className="text-2xl font-bold mb-10">Customer Panel</h1>

        <nav className="space-y-3">
          <button onClick={() => navigate("/user")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl">
            Dashboard
          </button>

          <button onClick={() => navigate("/place-order")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl">
            Place Order
          </button>

          <button onClick={() => navigate("/my-orders")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl">
            My Orders
          </button>

          <button onClick={() => navigate("/userprofile")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl">
            Profile
          </button>

          <button onClick={() => navigate("/usernotifications")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl">
            Notifications
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

export default UserLayout;