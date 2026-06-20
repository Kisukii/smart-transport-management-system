import { useEffect, useState } from "react";
import axios from "axios";

function OrdersManagement() {
  const API = "http://localhost:5000/api/orders";
  const DRIVER_API = "http://localhost:5000/api/drivers";

  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const [order, setOrder] = useState({
    customerName: "",
    pickup: "",
    destination: "",
    driverId: "",
    status: "Pending",
  });

  // LOAD DATA
  useEffect(() => {
    loadOrders();
    loadDrivers();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await axios.get(API);
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadDrivers = async () => {
    try {
      const res = await axios.get(DRIVER_API);
      setDrivers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // VALIDATION
  const validate = () => {
    if (!order.customerName.trim()) return "Customer name required";
    if (!order.pickup.trim()) return "Pickup required";
    if (!order.destination.trim()) return "Destination required";
    if (!order.driverId) return "Select a driver";
    return "";
  };

  // SAVE
  const handleSave = async () => {
    const err = validate();
    if (err) return setError(err);

    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, order);
      } else {
        await axios.post(API, order);
      }

      setOrder({
        customerName: "",
        pickup: "",
        destination: "",
        driverId: "",
        status: "Pending",
      });

      setEditId(null);
      setShowForm(false);
      setError("");
      loadOrders();
    } catch (err) {
      console.log(err);
    }
  };
//back
  <button
        onClick={goBack}
        className="mb-6 bg-slate-700 px-4 py-2 rounded-lg"
      >
        ← Back to Dashboard
      </button>

  // DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      loadOrders();
    } catch (err) {
      console.log(err);
    }
  };

  // EDIT
  const handleEdit = (o) => {
    setOrder(o);
    setEditId(o._id || o.id);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">

      <h1 className="text-4xl font-bold mb-6">Orders Management</h1>

      <button
        onClick={() => {
          setShowForm(true);
          setEditId(null);
          setOrder({
            customerName: "",
            pickup: "",
            destination: "",
            driverId: "",
            status: "Pending",
          });
        }}
        className="bg-cyan-500 px-4 py-2 rounded mb-6"
      >
        + Create Order
      </button>

      {/* FORM */}
      {showForm && (
        <div className="bg-[#1e293b] p-6 rounded mb-6">

          {error && <p className="text-red-400 mb-2">{error}</p>}

          <input
            placeholder="Customer Name"
            value={order.customerName}
            onChange={(e) =>
              setOrder({ ...order, customerName: e.target.value })
            }
            className="w-full p-2 mb-2 bg-slate-700 rounded"
          />

          <input
            placeholder="Pickup"
            value={order.pickup}
            onChange={(e) =>
              setOrder({ ...order, pickup: e.target.value })
            }
            className="w-full p-2 mb-2 bg-slate-700 rounded"
          />

          <input
            placeholder="Destination"
            value={order.destination}
            onChange={(e) =>
              setOrder({ ...order, destination: e.target.value })
            }
            className="w-full p-2 mb-2 bg-slate-700 rounded"
          />

          {/* DRIVER SELECT */}
          <select
            value={order.driverId}
            onChange={(e) =>
              setOrder({ ...order, driverId: e.target.value })
            }
            className="w-full p-2 mb-2 bg-slate-700 rounded"
          >
            <option value="">Select Driver</option>
            {drivers.map((d) => (
              <option key={d._id || d.id} value={d._id || d.id}>
                {d.name}
              </option>
            ))}
          </select>

          {/* STATUS */}
          <select
            value={order.status}
            onChange={(e) =>
              setOrder({ ...order, status: e.target.value })
            }
            className="w-full p-2 mb-4 bg-slate-700 rounded"
          >
            <option>Pending</option>
            <option>In Transit</option>
            <option>Delivered</option>
          </select>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="bg-green-500 px-4 py-2 rounded"
            >
              Save
            </button>

            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-500 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>

        </div>
      )}

      {/* TABLE */}
      <div className="bg-[#1e293b] rounded overflow-hidden">

        <table className="w-full">
          <thead className="bg-slate-700">
            <tr>
              <th className="p-3">Customer</th>
              <th className="p-3">Pickup</th>
              <th className="p-3">Destination</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o._id || o.id}>
                <td className="p-3">{o.customerName}</td>
                <td className="p-3">{o.pickup}</td>
                <td className="p-3">{o.destination}</td>
                <td className="p-3">{o.status}</td>

                <td className="p-3">
                  <button
                    onClick={() => handleEdit(o)}
                    className="bg-green-500 px-3 py-1 mr-2 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(o._id || o.id)}
                    className="bg-red-500 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default OrdersManagement;