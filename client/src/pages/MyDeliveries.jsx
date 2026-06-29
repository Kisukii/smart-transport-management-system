import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyDeliveries = () => {
  const navigate = useNavigate();

  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDeliveries();
  }, []);

  const loadDeliveries = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/orders/driver/deliveries",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDeliveries(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load deliveries"
      );
    } finally {
      setLoading(false);
    }
  };
 const updateStatus = async (id, status) => {
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

  loadDeliveries();
};
  const handleConfirmDelivery = async (orderId) => {
    try {
      const token = localStorage.getItem("driverToken");

      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        {
          status: "Delivered",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Delivery Confirmed!");

      setDeliveries((prev) =>
        prev.map((delivery) =>
          delivery._id === orderId
            ? { ...delivery, status: "Delivered" }
            : delivery
        )
      );
    } catch (err) {
      alert(
        err.response?.data?.message || "Failed to update delivery"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading Deliveries...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-red-500 flex items-center justify-center">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">
        My Deliveries
      </h1>

      {deliveries.length === 0 ? (
        <div className="text-center text-slate-400">
          No Active Deliveries
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {deliveries.map((delivery) => (
            <div
              key={delivery._id}
              className="bg-slate-900 border border-slate-700 rounded-2xl p-6"
            >
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">
                  {delivery.orderId}
                </h2>

                <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
                  {delivery.status}
                </span>
              </div>

              <p>
                <b>Customer:</b>{" "}
                {delivery.customer?.name || delivery.customerName}
              </p>

              <p>
                <b>Pickup:</b> {delivery.pickupLocation}
              </p>

              <p>
                <b>Drop:</b> {delivery.dropLocation}
              </p>

              <p>
                <b>Vehicle:</b>{" "}
                {delivery.vehicle
                  ? `${delivery.vehicle.vehicleId} - ${delivery.vehicle.vehicleNumber}`
                  : "Not Assigned"}
              </p>

              <p>
                <b>Package:</b>{" "}
                {delivery.packageType}
              </p>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() =>
                    navigate("/navigation", {
                      state: {
                        orderId: delivery.orderId,
                        pickupLocation: delivery.pickupLocation,
                        dropLocation: delivery.dropLocation,
                      },
                    })
                  }
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 p-3 rounded-xl"
                >
                  Route
                </button>
{delivery.status === "Accepted" && (
  <button
    onClick={() =>
      updateStatus(delivery._id, "Picked Up")
    }
  >
    Pick Up Package
  </button>
)}

{delivery.status === "Picked Up" && (
  <button
    onClick={() =>
      updateStatus(delivery._id, "In Transit")
    }
  >
    Start Transit
  </button>
)}

{delivery.status === "In Transit" && (
  <button
    onClick={() =>
      updateStatus(delivery._id, "Delivered")
    }
  >
    Confirm Delivery
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

export default MyDeliveries;