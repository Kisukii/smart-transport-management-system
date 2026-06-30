import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 import DriverLayout from "./DriverLayout";

const NewOrderRequests = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const navItem =
  "w-full text-left hover:bg-slate-800 p-3 rounded-xl transition";

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/orders/driver",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/orders/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      loadOrders();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update order");
    }
  };

  if (loading)
    return (
      <div className="text-white p-8">
        Loading Orders...
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

           <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-900 border-r border-slate-800 p-6">

        <h1 className="text-2xl font-bold mb-10">
          🚚 Driver Panel
        </h1>

        <nav className="space-y-3">

          {/* <button
            onClick={() => navigate("/driver")}
            className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"
          >
            Dashboard
          </button> */}

          <button
            onClick={() => navigate("/driver/new-orders")}
            className="w-full text-left  bg-indigo-600 hover:bg-slate-800 p-3 rounded-xl"
          >
            New Order Requests
          </button>

          <button
            onClick={() => navigate("/driverdeliveries")}
            className="w-full text-left   hover:bg-slate-800 p-3 rounded-xl"
          >
            My Deliveries
          </button>

          <button
            onClick={() => navigate("/navigation")}
            className="w-full text-left   hover:bg-slate-800 p-3 rounded-xl"
          >
            Route Navigation
          </button>

          <button
          onClick={() => navigate("/driverstatus")}
            className="w-full text-left  hover:bg-slate-800 p-3 rounded-xl"
          >
            Driver Status
          </button>

         {/* <button
            onClick={() => navigate("/report-issue")}
            className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"
          >
            Vehicle Issue Report
          </button> */}

          {/* <button
            onClick={() => navigate("/drivernotifications")}
            className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"
          >
            Notifications
          </button>  */}

          <button
            onClick={() => navigate("/driver/profile")}
            className="w-full text-left   hover:bg-slate-800 p-3 rounded-xl"
          >
            Driver Profile
          </button>

        </nav>

        <button
          onClick={handleLogout}
          className="absolute bottom-6 left-6 right-6 bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white p-3 rounded-xl"
        >
          Logout
        </button>
      </aside>

      <h1 className="text-3xl font-bold mb-8">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p>No Assigned Orders</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">

          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-slate-900 rounded-2xl p-6 border border-slate-700"
            >

              <div className="flex justify-between mb-4">

                <h2 className="text-xl font-bold">
                  {order.orderId}
                </h2>

                <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                  {order.status}
                </span>

              </div>

              <p>
                <b>Customer:</b> {order.customerName}
              </p>

              <p>
                <b>Phone:</b> {order.phone}
              </p>

              <p>
                <b>Pickup:</b> {order.pickupLocation}
              </p>

              <p>
                <b>Drop:</b> {order.dropLocation}
              </p>

              <p>
                <b>Package:</b> {order.packageType}
              </p>

              <p>
                <b>Weight:</b> {order.packageWeight} kg
              </p>

              <p>
                <b>Payment:</b> {order.paymentMethod}
              </p>

              <p>
                <b>Vehicle ID:</b> {order.vehicle?.vehicleId}
              </p>

              <p>
                <b>Vehicle Number:</b> {order.vehicle?.vehicleNumber}
              </p>

              <p>
                <b>Vehicle Type:</b> {order.vehicle?.type}
              </p>

              <p>
                <b>Capacity:</b> {order.vehicle?.capacity} kg
              </p>

              <div className="mt-6 flex flex-wrap gap-3">

                {order.status === "Assigned" && (
                  <>
                    <button
                      onClick={() =>
                        updateStatus(order._id, "Accepted")
                      }
                      className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(order._id, "Rejected")
                      }
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl"
                    >
                      Reject
                    </button>
                  </>
                )}

                {order.status === "Accepted" && (
                  <button
                    onClick={() =>
                      updateStatus(order._id, "Picked Up")
                    }
                    className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-xl"
                  >
                    Picked Up
                  </button>
                )}

                {order.status === "Picked Up" && (
                  <button
                    onClick={() =>
                      updateStatus(order._id, "In Transit")
                    }
                    className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl"
                  >
                    In Transit
                  </button>
                )}

                {order.status === "In Transit" && (
                  <button
                    onClick={() =>
                      updateStatus(order._id, "Delivered")
                    }
                    className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl"
                  >
                    Delivered
                  </button>
                )}

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
};

export default NewOrderRequests;