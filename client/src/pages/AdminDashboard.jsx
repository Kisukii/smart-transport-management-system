import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const navigate = useNavigate();

  const [drivers, setDrivers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);

  const DRIVERS_API = "http://localhost:5000/api/drivers";
  const ORDERS_API = "http://localhost:5000/api/orders";
  const ORDER_REQUESTS_API = "http://localhost:5000/api/orderrequests";
  const CUSTOMERS_API = "http://localhost:5000/api/customers";

  useEffect(() => {
    loadDrivers();
    loadOrders();
    loadCustomers();
  }, []);

  const loadDrivers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(DRIVERS_API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDrivers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const [reqRes, ordRes] = await Promise.all([
        axios.get(ORDER_REQUESTS_API, {
          headers: { Authorization: `Bearer ${token}` },
        }).catch(() => ({ data: [] })),
        axios.get(ORDERS_API, {
          headers: { Authorization: `Bearer ${token}` },
        }).catch(() => ({ data: [] })),
      ]);

      const reqData = Array.isArray(reqRes.data)
        ? reqRes.data
        : reqRes.data.requests || reqRes.data.data || [];

      const ordData = Array.isArray(ordRes.data)
        ? ordRes.data
        : ordRes.data.orders || ordRes.data.data || [];

      setOrders([...reqData, ...ordData]);
    } catch (err) {
      console.log(err);
    }
  };

  const loadCustomers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(CUSTOMERS_API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCustomers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const totalDrivers = drivers.length;

  const availableDrivers = drivers.filter(
    (d) => (d.status || "Available") === "Available"
  ).length;

  const busyDrivers = drivers.filter(
    (d) => (d.status || "Available") === "Busy"
  ).length;

  const onLeaveDrivers = drivers.filter(
    (d) => (d.status || "Available") === "On Leave"
  ).length;

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (o) => (o.status || "Pending") === "Pending"
  ).length;
  const assignedOrders = orders.filter((o) => o.status === "Assigned").length;
  const completedOrders = orders.filter((o) => o.status === "Completed").length;

  const totalCustomers = customers.length;
  const newCustomersToday = customers.filter((customer) => {
    const today = new Date().toDateString();
    return new Date(customer.createdAt).toDateString() === today;
  }).length;

  return (
    <>
      <div className="mb-8 bg-linear-to-r from-indigo-600 to-purple-700 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-white">Welcome back, Admin</h1>
        <p className="text-indigo-100 mt-2">
          Monitor drivers, vehicles, orders, and customers .
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:scale-105 transition">
          <p className="text-slate-400">Total Drivers</p>
          <h2 className="text-4xl font-bold mt-3 text-white">{totalDrivers}</h2>
          <p className="text-slate-500 text-sm mt-2">All registered drivers</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:scale-105 transition">
          <p className="text-slate-400">Available Drivers</p>
          <h2 className="text-4xl font-bold mt-3 text-green-400">{availableDrivers}</h2>
          <p className="text-slate-500 text-sm mt-2">Ready for assignment</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:scale-105 transition">
          <p className="text-slate-400">Busy Drivers</p>
          <h2 className="text-4xl font-bold mt-3 text-yellow-400">{busyDrivers}</h2>
          <p className="text-slate-500 text-sm mt-2">Currently on delivery</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:scale-105 transition">
          <p className="text-slate-400">Drivers On Leave</p>
          <h2 className="text-4xl font-bold mt-3 text-red-400">{onLeaveDrivers}</h2>
          <p className="text-slate-500 text-sm mt-2">Unavailable today</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <button
          onClick={() => navigate("/admin/orders")}
          className="text-left bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:border-indigo-500 transition"
        >
          <p className="text-slate-400">Total Orders</p>
          <h2 className="text-4xl font-bold mt-3 text-white">{totalOrders}</h2>
          <p className="text-slate-500 text-sm mt-2">View and manage all orders</p>
        </button>

        <button
          onClick={() => navigate("/admin/customers")}
          className="text-left bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:border-indigo-500 transition"
        >
          <p className="text-slate-400">Total Customers</p>
          <h2 className="text-4xl font-bold mt-3 text-white">{totalCustomers}</h2>
          <p className="text-slate-500 text-sm mt-2">View and manage customer accounts</p>
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          <button
            onClick={() => navigate("/admin/drivers")}
            className="bg-slate-800 hover:bg-indigo-600 p-4 rounded-2xl"
          >
            🚗 Manage Drivers
          </button>

          <button
            onClick={() => navigate("/admin/vehicles")}
            className="bg-slate-800 hover:bg-indigo-600 p-4 rounded-2xl"
          >
            🛻 Manage Vehicles
          </button>

          <button
            onClick={() => navigate("/admin/orders")}
            className="bg-slate-800 hover:bg-indigo-600 p-4 rounded-2xl"
          >
            📦 Manage Orders
          </button>

          <button
            onClick={() => navigate("/admin/customers")}
            className="bg-slate-800 hover:bg-indigo-600 p-4 rounded-2xl"
          >
            👥 Manage Customers
          </button>

          <button
            onClick={() => navigate("/admin/profile")}
            className="bg-slate-800 hover:bg-indigo-600 p-4 rounded-2xl"
          >
            👤 Profile
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;