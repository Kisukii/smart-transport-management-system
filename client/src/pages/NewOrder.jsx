import { useState } from "react";

function NewOrder({ goBack }) {
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    travelDate: "",
    vehicleType: "",
    passengers: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      `Booking Created!\n\nFrom: ${formData.source}\nTo: ${formData.destination}`
    );

    setFormData({
      source: "",
      destination: "",
      travelDate: "",
      vehicleType: "",
      passengers: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        Create New Booking
      </h1>

      <button
        onClick={goBack}
        className="mb-6 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-xl"
      >
        ← Back to Dashboard
      </button>

      <div className="max-w-2xl bg-[#1e293b] p-8 rounded-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Source
            </label>
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleChange}
              placeholder="Enter Source Location"
              className="w-full p-3 rounded-xl bg-slate-700 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Destination
            </label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Enter Destination"
              className="w-full p-3 rounded-xl bg-slate-700 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Travel Date
            </label>
            <input
              type="date"
              name="travelDate"
              value={formData.travelDate}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-slate-700 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Vehicle Type
            </label>
            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-slate-700 outline-none"
              required
            >
              <option value="">Select Vehicle</option>
              <option value="Bus">Bus</option>
              <option value="Mini Bus">Mini Bus</option>
              <option value="Van">Van</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Number of Passengers
            </label>
            <input
              type="number"
              name="passengers"
              value={formData.passengers}
              onChange={handleChange}
              placeholder="Enter Number of Passengers"
              className="w-full p-3 rounded-xl bg-slate-700 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-500 px-6 py-3 rounded-xl font-semibold"
          >
            Create Booking
          </button>

        </form>
      </div>
    </div>
  );
}

export default NewOrder;