import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/orders/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        {loading ? (
          <p className="text-slate-300">Loading orders...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : orders.length === 0 ? (
          <p className="text-slate-300">No orders found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.map((order) => {
              const orderId = order.orderId || order._id;
              return (
                <div
                  key={orderId}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl"
                >
                  <div className="flex justify-between items-center mb-5">
                    <div>
                      <h2 className="text-xl font-bold">{orderId}</h2>
                      <p className="text-slate-400 text-sm mt-1">{order.status}</p>
                    </div>
                    <span className="bg-yellow-500/10 text-yellow-400 px-4 py-2 rounded-full text-sm">
                      {order.status}
                    </span>
                  </div>

                  <p className="text-slate-400">Pickup</p>
                  <p className="mb-3">{order.pickupLocation}</p>

                  <p className="text-slate-400">Drop</p>
                  <p className="mb-3">{order.dropLocation}</p>

                  <p className="text-slate-400">Driver</p>
                  <p className="mb-5">
                    {order.driver?.driverId ? order.driver.driverId : "Not assigned"}
                  </p>

                  <button
                    onClick={() => navigate(`/track-shipment/${orderId}`)}
                    className="bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded-xl font-semibold"
                  >
                    Track Shipment
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyOrders;