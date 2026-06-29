import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OrderRequests = () => {
  const navigate = useNavigate();
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 const [drivers, setDrivers] = useState([]);
const [vehicles, setVehicles] = useState([]);
const [selectedDriver, setSelectedDriver] = useState({});
const [selectedVehicle, setSelectedVehicle] = useState({});
useEffect(() => {
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

  loadData();
}, []);

const assignOrder = async (id) => {
  try {
    const token = localStorage.getItem("token");

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

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-8">Order Requests</h1>

        {loading ? (
          <p className="text-slate-300">Loading order requests...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : pendingOrders.length === 0 ? (
          <p className="text-slate-300">No pending order requests.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pendingOrders.map((order) => (
              <div
                key={order.orderId || order._id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl"
              >
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-xl font-bold">{order.orderId || order._id}</h2>
                  <span className="bg-yellow-500/10 text-yellow-400 px-4 py-2 rounded-full text-sm">
                    {order.status}
                  </span>
                </div>

                <p className="text-slate-400">Customer</p>
               <p className="mb-3"> {order.customerName || order.customer?.name || "Unknown"}
</p>
                <p className="text-slate-400">Pickup</p>
                <p className="mb-3">{order.pickupLocation}</p>

                <p className="text-slate-400">Drop</p>
                <p className="mb-3">{order.dropLocation}</p>

                <p className="text-slate-400">Package</p>
                <p className="mb-5">{order.instructions || order.packageType || "N/A"}</p>
<select
  className="w-full mb-3 bg-slate-800 p-3 rounded-xl"
  onChange={(e) =>
    setSelectedDriver({
      ...selectedDriver,
      [order._id]: e.target.value,
    })
  }
>
  <option value="">Select Driver</option>

  {drivers.map((driver) => (
    <option key={driver._id} value={driver._id}>
      {driver.name}
    </option>
  ))}
</select>

<select
  className="w-full mb-4 bg-slate-800 p-3 rounded-xl"
  onChange={(e) =>
    setSelectedVehicle({
      ...selectedVehicle,
      [order._id]: e.target.value,
    })
  }
>
  <option value="">Select Vehicle</option>

  {vehicles.map((vehicle) => (
    <option key={vehicle._id} value={vehicle._id}>
      {vehicle.registrationNumber}
    </option>
  ))}
</select>

<button
  className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl font-semibold"
  onClick={() => assignOrder(order._id)}
>
  Assign Driver & Vehicle
</button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default OrderRequests;