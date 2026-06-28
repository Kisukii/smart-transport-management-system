import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    pickupLocation: "",
    dropLocation: "",
    packageDetails: "",
    receiverName: "",
    receiverPhone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Order placed:", form);

  // later your teammate can add:
  // await axios.post("http://localhost:5000/api/orders", form);

  navigate("/my-orders");
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
          </div>

          <textarea
            name="packageDetails"
            value={form.packageDetails}
            onChange={handleChange}
            placeholder="Package Details"
            className="w-full mt-6 bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:border-indigo-500"
            rows="4"
            required
          />

          <button className="mt-6 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-semibold">
            Submit Order
          </button>
        </form>
      </main>
    </div>
  );
};

export default PlaceOrder;