import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
 
const UserLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
 
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/");
  };
const linkStyle = {
  display: "block",
  padding: "12px",
  color: "white",
  textDecoration: "none",
};
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-900/95 border-r border-slate-800 p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-10 tracking-tight">Customer Panel</h1>
 
        <nav className="space-y-2">
          <button
            onClick={() => navigate("/user")}
            className={`w-full text-left p-3 rounded-xl transition-colors ${
              location.pathname === "/user"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950/40 font-medium"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            Dashboard
          </button>
 
          <button
            onClick={() => navigate("/place-order")}
            className={`w-full text-left p-3 rounded-xl transition-colors ${
              location.pathname === "/place-order"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950/40 font-medium"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            Place Order
          </button>
 
          <button
            onClick={() => navigate("/my-orders")}
            className={`w-full text-left p-3 rounded-xl transition-colors ${
              location.pathname === "/my-orders"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950/40 font-medium"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            My Orders
          </button>
              <button
            onClick={() => navigate("/my-requests")}
            className={`w-full text-left p-3 rounded-xl transition-colors ${
              location.pathname === "/my-requests"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950/40 font-medium"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            My requests
          </button>
 
          <button
            onClick={() => navigate("/user/profile")}
            className={`w-full text-left p-3 rounded-xl transition-colors ${
              location.pathname === "/user/profile"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950/40 font-medium"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            Profile
          </button>
 
          <button
            onClick={() => navigate("/user/notifications")}
            className={`w-full text-left p-3 rounded-xl transition-colors ${
              location.pathname === "/user/notifications"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950/40 font-medium"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            Notifications
          </button>
          </nav>
        {/* </nav>
        <NavLink to="/user" className={linkStyle}>Dashboard</NavLink>
        <NavLink to="/profile" className={linkStyle} state={{ from: location.pathname }}>Profile</NavLink>
        <NavLink to="/place-order" className={linkStyle}>Profile</NavLink>
        <NavLink to="/my-orders" className={linkStyle}>My Orders</NavLink>
        <NavLink to="/user/notifications" className={linkStyle}>Notifications</NavLink>
        <NavLink to="/user/track-shipment" className={linkStyle}>Track Shipment</NavLink>
        <NavLink to="/user/delivery-confirmation" className={linkStyle}>Delivery Confirmation</NavLink>
        <NavLink to="/user/delivery-history" className={linkStyle}>Delivery History</NavLink>
        <NavLink to="/user/download-receipt" className={linkStyle}>Download Receipt</NavLink>
 */}
 
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
 
export default UserLayout;