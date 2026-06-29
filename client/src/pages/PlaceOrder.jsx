import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    pickupLocation: "",
    dropLocation: "",
    packageType: "Documents",
    packageDetails: "",
    receiverName: "",
    receiverPhone: "",
    paymentMethod: "Cash",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/orderrequests",
        {
          customerName: form.receiverName,
          phone: form.receiverPhone,
          customerPhone: form.receiverPhone,
          pickupLocation: form.pickupLocation,
          dropLocation: form.dropLocation,
          instructions: form.packageDetails,
          packageType: form.packageType,
          paymentMethod: form.paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/my-requests");
    } catch (err) {
  console.log(err.response.data);
  console.log(err.response.status);

  setError(err.response?.data?.message || err.message);
}finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-8">Place New Order</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl max-w-3xl"
        >
          <div className="grid grid-cols-2 gap-6">
            <input
              name="pickupLocation"
              value={form.pickupLocation}
              onChange={handleChange}
              placeholder="Pickup Location"
              className="bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:border-indigo-500"
              required
            />

            <input
              name="dropLocation"
              value={form.dropLocation}
              onChange={handleChange}
              placeholder="Drop Location"
              className="bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:border-indigo-500"
              required
            />

            <input
              name="receiverName"
              value={form.receiverName}
              onChange={handleChange}
              placeholder="Receiver Name"
              className="bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:border-indigo-500"
              required
            />

            <input
              name="receiverPhone"
              value={form.receiverPhone}
              onChange={handleChange}
              placeholder="Receiver Phone"
              className="bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:border-indigo-500"
              required
            />

            <select
              name="packageType"
              value={form.packageType}
              onChange={handleChange}
              className="bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:border-indigo-500"
            >
              <option value="Documents">Documents</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Food">Food</option>
              <option value="Furniture">Furniture</option>
            </select>
          </div>

          <textarea
            name="packageDetails"
            value={form.packageDetails}
            onChange={handleChange}
            placeholder="Package Details (optional)"
            className="w-full mt-6 bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:border-indigo-500"
            rows="4"
          />

          {error && <p className="text-red-400 mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-semibold disabled:opacity-50"
          >
            {loading ? "Placing order..." : "Submit Order"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default PlaceOrder;