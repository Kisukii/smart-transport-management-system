import { useState, useEffect } from "react";
import axios from "axios";

const OrderRequests = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const [selectedDriver, setSelectedDriver] = useState({});
  const [selectedVehicle, setSelectedVehicle] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const token = localStorage.getItem("token");

      const [ordersRes, driversRes, vehiclesRes] = await Promise.all([
        axios.get("http://localhost:5000/api/orderrequests", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),

        axios.get("http://localhost:5000/api/drivers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),

        axios.get("http://localhost:5000/api/vehicles"),
      ]);

      console.log("Vehicles:", vehiclesRes.data);

      setPendingOrders(ordersRes.data);
      setDrivers(driversRes.data);
      setVehicles(vehiclesRes.data);
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

  const assignOrder = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!selectedDriver[id] || !selectedVehicle[id]) {
        return alert("Please select both a driver and a vehicle.");
      }

      await axios.post(
        `http://localhost:5000/api/orderrequests/${id}/assign`,
        {
          driver: selectedDriver[id],
          vehicle: selectedVehicle[id],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order Assigned Successfully");

      setPendingOrders((prev) =>
        prev.filter((order) => order._id !== id)
      );
    } catch (err) {
      alert(err.response?.data?.message || "Assignment failed");
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

              <select
                className="w-full p-3 mb-3 bg-slate-800 rounded-xl"
                value={selectedDriver[order._id] || ""}
                onChange={(e) =>
                  setSelectedDriver({
                    ...selectedDriver,
                    [order._id]: e.target.value,
                  })
                }
              >
                <option value="">
                  Select Driver
                </option>

                {drivers.map((driver) => (
                  <option
                    key={driver._id}
                    value={driver._id}
                  >
                    {driver.driverId
                      ? `${driver.driverId} - ${driver.name}`
                      : driver.name}
                  </option>
                ))}
              </select>

              <select
                className="w-full p-3 mb-4 bg-slate-800 rounded-xl"
                value={selectedVehicle[order._id] || ""}
                onChange={(e) =>
                  setSelectedVehicle({
                    ...selectedVehicle,
                    [order._id]: e.target.value,
                  })
                }
              >
                <option value="">
                  Select Vehicle
                </option>

                {vehicles.map((vehicle) => (
                  <option
                    key={vehicle._id}
                    value={vehicle._id}
                  >
                    {vehicle.vehicleId
                      ? `${vehicle.vehicleId} - ${vehicle.vehicleNumber}`
                      : vehicle.vehicleNumber}
                  </option>
                ))}
              </select>

              <button
                onClick={() => assignOrder(order._id)}
                className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-xl"
              >
                Assign Driver & Vehicle
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderRequests;