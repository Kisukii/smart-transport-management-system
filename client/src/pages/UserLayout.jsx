import { NavLink, useNavigate } from "react-router-dom";

const UserLayout = ({ children }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userToken");
    navigate("/user-login");
  };

  const linkStyle = ({ isActive }) =>
  `block px-4 py-3 rounded-lg mb-2 transition ${
    isActive
      ? "bg-slate-700 text-white"
      : "text-slate-300 hover:bg-slate-800 hover:text-white"
  }`;

  return (
    <div className="min-h-screen flex bg-slate-950 text-white">
      <aside className="w-64 bg-slate-900 text-white p-6 shadow-xl border-r border-slate-800">
        <h2 className="text-2xl font-bold mb-8">👥 User Panel</h2>

        <NavLink to="/user/dashboard" className={linkStyle}>Dashboard</NavLink>
        <NavLink to="/user/profile" className={linkStyle}>Profile</NavLink>
        <NavLink to="/user/notifications" className={linkStyle}>Notifications</NavLink>
        <NavLink to="/user/track-shipment" className={linkStyle}>Track Shipment</NavLink>
        <NavLink to="/user/delivery-confirmation" className={linkStyle}>Delivery Confirmation</NavLink>
        <NavLink to="/user/delivery-history" className={linkStyle}>Delivery History</NavLink>
        <NavLink to="/user/download-receipt" className={linkStyle}>Download Receipt</NavLink>

        <button
          onClick={logout}
          className="w-full mt-8 bg-red-600 hover:bg-red-700 py-3 rounded-lg"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-8 bg-slate-950 text-white">{children}</main>
    </div>
  );
};

export default UserLayout;