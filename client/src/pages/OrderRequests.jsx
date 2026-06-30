import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrderRequests = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const token = localStorage.getItem("token");

      const ordersRes = await axios.get("http://localhost:5000/api/orderrequests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPendingOrders(ordersRes.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load data"
      );
    } finally {
      setLoading(false);
    }
  };

  const approveRequest = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:5000/api/orderrequests/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order request approved");
      setPendingOrders((prev) => prev.filter((order) => order._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Approval failed");
    }
  };

  const rejectRequest = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:5000/api/orderrequests/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order request rejected");
      setPendingOrders((prev) => prev.filter((order) => order._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Rejection failed");
    }
  };

  if (loading)
    return (
      <div className="text-white p-8">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 p-8">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-3xl font-bold mb-8">
        Order Requests
      </h1>

      {pendingOrders.length === 0 ? (
        <p>No Pending Orders</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {pendingOrders.map((order) => (
            <div
              key={order._id}
              className="bg-slate-900 rounded-2xl p-6 border border-slate-700"
            >
              <h2 className="text-xl font-bold mb-2">
                {order.orderId || order._id}
              </h2>

              <p>
                <b>Customer:</b>{" "}
                {order.customerName}
              </p>

              <p>
                <b>Pickup:</b>{" "}
                {order.pickupLocation}
              </p>

              <p>
                <b>Drop:</b>{" "}
                {order.dropLocation}
              </p>

              <p>
                <b>Package:</b>{" "}
                {order.packageType}
              </p>

              <p className="mb-4">
                <b>Status:</b>{" "}
                {order.status}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => approveRequest(order._id)}
                  className="flex-1 bg-green-600 hover:bg-green-700 p-3 rounded-xl"
                >
                  Approve
                </button>

                <button
                  onClick={() => rejectRequest(order._id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 p-3 rounded-xl"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderRequests;