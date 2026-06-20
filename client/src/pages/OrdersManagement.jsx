import { useEffect, useState } from "react";
import axios from "axios";

function OrdersManagement({ goBack }) {
  const API = "http://localhost:5000/api/orders";

  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const [newOrder, setNewOrder] = useState({
    customerName: "",
    pickup: "",
    drop: "",
    status: "Pending",
  });

  // LOAD ORDERS
  const loadOrders = async () => {
    try {
      const res = await axios.get(API);
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // VALIDATION
  const validateOrder = () => {
    if (!newOrder.customerName.trim()) return "Customer name required";
    if (!newOrder.pickup.trim()) return "Pickup required";
    if (!newOrder.drop.trim()) return "Drop required";
    return "";
  };

  // SAVE (ADD / UPDATE)
  const handleSave = async () => {
    const err = validateOrder();
    if (err) return setError(err);

    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, newOrder);
      } else {
        await axios.post(API, newOrder);
      }

      setNewOrder({
        customerName: "",
        pickup: "",
        drop: "",
        status: "Pending",
      });

      setShowForm(false);
      setEditId(null);
      setError("");
      loadOrders();
    } catch (err) {
      console.log(err);
    }
  };

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
  const handleEdit = (order) => {
    setNewOrder(order);
    setEditId(order._id || order.id);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">

      <button
        onClick={goBack}
        className="mb-6 bg-slate-700 px-4 py-2 rounded"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold mb-6">Orders Management</h1>

      {/* ADD BUTTON */}
      <button
        onClick={() => {
          setShowForm(true);
          setEditId(null);
        }}
        className="bg-cyan-500 px-4 py-2 rounded mb-6"
      >
        + Add Order
      </button>

      {/* FORM */}
      {showForm && (
        <div className="bg-[#1e293b] p-6 rounded mb-6">

          {error && <p className="text-red-400 mb-3">{error}</p>}

          <input
            placeholder="Customer Name"
            className="w-full p-2 mb-2 bg-slate-700"
            value={newOrder.customerName}
            onChange={(e) =>
              setNewOrder({ ...newOrder, customerName: e.target.value })
            }
          />

          <input
            placeholder="Pickup Location"
            className="w-full p-2 mb-2 bg-slate-700"
            value={newOrder.pickup}
            onChange={(e) =>
              setNewOrder({ ...newOrder, pickup: e.target.value })
            }
          />

          <input
            placeholder="Drop Location"
            className="w-full p-2 mb-2 bg-slate-700"
            value={newOrder.drop}
            onChange={(e) =>
              setNewOrder({ ...newOrder, drop: e.target.value })
            }
          />

          <select
            className="w-full p-2 mb-4 bg-slate-700"
            value={newOrder.status}
            onChange={(e) =>
              setNewOrder({ ...newOrder, status: e.target.value })
            }
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <button
            onClick={handleSave}
            className="bg-green-500 px-4 py-2 mr-2"
          >
            Save
          </button>

          <button
            onClick={() => setShowForm(false)}
            className="bg-gray-500 px-4 py-2"
          >
            Cancel
          </button>
        </div>
      )}

      {/* TABLE */}
      <div className="bg-[#1e293b] rounded overflow-hidden">
        <table className="w-full">

          <thead className="bg-slate-700">
            <tr>
              <th className="p-3">Customer</th>
              <th className="p-3">Pickup</th>
              <th className="p-3">Drop</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o._id || o.id} className="border-b border-slate-700">

                <td className="p-3">{o.customerName}</td>
                <td className="p-3">{o.pickup}</td>
                <td className="p-3">{o.drop}</td>
                <td className="p-3">{o.status}</td>

                <td className="p-3">
                  <button
                    onClick={() => handleEdit(o)}
                    className="bg-green-500 px-3 py-1 mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(o._id || o.id)}
                    className="bg-red-500 px-3 py-1"
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