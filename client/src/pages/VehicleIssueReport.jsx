import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VehicleIssueReport = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    vehicleNumber: "",
    issueType: "",
    description: "",
    urgency: "Low",
  });

  const handleLogout = () => {
    localStorage.removeItem("driverToken");
    navigate("/");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /*
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const driverId = localStorage.getItem("driverId");

    await axios.post(
      `http://localhost:5000/api/driver/${driverId}/report-issue`,
      form
    );

    alert("Vehicle issue report submitted");

    setForm({
      vehicleNumber: "",
      issueType: "",
      description: "",
      urgency: "Low",
    });
  } catch (error) {
    console.log(error);
  }
};
*/

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Vehicle issue report submitted");
    setForm({
      vehicleNumber: "",
      issueType: "",
      description: "",
      urgency: "Low",
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-900 border-r border-slate-800 p-6">
        <h1 className="text-2xl font-bold mb-10">🚚 Driver Panel</h1>

        <nav className="space-y-3">
          <button onClick={() => navigate("/driver")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"> Dashboard</button>
          <button onClick={() => navigate("/driver/new-orders")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"> New Order Requests</button>
          <button onClick={() => navigate("/driverdeliveries")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"> My Deliveries</button>
          <button onClick={() => navigate("/navigation")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"> Route Navigation</button>
          <button onClick={() => navigate("/vehiclestatus")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"> Vehicle Status</button>
          <button className="w-full text-left bg-indigo-600 p-3 rounded-xl"> Vehicle Issue Report</button>
          {/* <button onClick={() => navigate("/drivernotifications")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"> Notifications</button> */}
          <button onClick={() => navigate("/driver/profile")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"> Driver Profile</button>
        </nav>

        <button onClick={handleLogout} className="absolute bottom-6 left-6 right-6 text-left bg-red-500/10 text-red-400 hover:bg-red-600 hover:text-white p-3 rounded-xl">
           Logout
        </button>
      </aside>

      <main className="ml-72 p-8">
        <h2 className="text-4xl font-bold mb-2">Vehicle Issue Report</h2>
        <p className="text-slate-400 mb-8">Report vehicle problems to management</p>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl max-w-2xl space-y-5"
        >
          <input
            name="vehicleNumber"
            value={form.vehicleNumber}
            onChange={handleChange}
            placeholder="Vehicle Number"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none"
            required
          />

          <input
            name="issueType"
            value={form.issueType}
            onChange={handleChange}
            placeholder="Issue Type"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none"
            required
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the issue"
            rows="5"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none"
            required
          ></textarea>

          <select
            name="urgency"
            value={form.urgency}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-semibold">
            Submit Report
          </button>
        </form>
      </main>
    </div>
  );
};

export default VehicleIssueReport;