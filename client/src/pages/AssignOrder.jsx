import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AssignOrder = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [requests, setRequests] = useState([]);
  const [order, setOrder] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [reqRes, drvRes, vehRes] = await Promise.all([
          axios.get("http://localhost:5000/api/orderrequests/approved", {
            headers: { Authorization: `Bearer ${token}` },
          }).catch(() => ({ data: [] })),
          axios.get("http://localhost:5000/api/drivers", {
            headers: { Authorization: `Bearer ${token}` },
          }).catch(() => ({ data: [] })),
          axios.get("http://localhost:5000/api/vehicles").catch(() => ({ data: [] })),
        ]);

        const reqs = Array.isArray(reqRes.data) ? reqRes.data : reqRes.data.requests || reqRes.data.data || [];
        setRequests(reqs);

        const drv = Array.isArray(drvRes.data) ? drvRes.data : drvRes.data.drivers || drvRes.data.data || [];
        setDrivers(drv);

        const veh = Array.isArray(vehRes.data) ? vehRes.data : vehRes.data.vehicles || vehRes.data.data || [];
        setVehicles(veh);

        // choose order by param if provided, else first pending
        const selOrder = id ? reqs.find((r) => r._id === id) : reqs[0];
        setOrder(selOrder || null);
      } catch (err) {
        console.error("Fetch assign data error:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAssign = async (e) => {
    e.preventDefault();
    if (!order) return alert("No order selected to assign");
    if (!selectedDriver) return alert("Please select a driver");
    if (!selectedVehicle) return alert("Please select a vehicle");

    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:5000/api/orderrequests/${order._id}/assign`,
        { driver: selectedDriver, vehicle: selectedVehicle },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data?.message || "Order assigned successfully");
      navigate("/manager/order-requests");
    } catch (err) {
      console.error("Assign error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to assign order");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="p-8">
        <button
          onClick={() => navigate("/manager/order-requests")}
          className="mb-6 bg-slate-800 hover:bg-indigo-600 px-5 py-3 rounded-xl"
        >
          Back to Order Requests
        </button>

        <h1 className="text-3xl font-bold mb-6">Assign Order</h1>

        {!order ? (
          <div className="mb-6 text-slate-400">No pending order selected.</div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold mb-5">Order Details</h2>

              <p className="text-slate-400">Order ID</p>
              <p className="mb-3">{order._id}</p>

              <p className="text-slate-400">Customer</p>
              <p className="mb-3">{order.customerName}</p>

              <p className="text-slate-400">Pickup</p>
              <p className="mb-3">{order.pickupLocation}</p>

              <p className="text-slate-400">Drop</p>
              <p className="mb-3">{order.dropLocation}</p>

              <p className="text-slate-400">Package</p>
              <p>{order.packageType || order.packageDetails}</p>
            </div>

            <form
              onSubmit={handleAssign}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl"
            >
              <h2 className="text-2xl font-bold mb-5">Select Driver & Vehicle</h2>

              <select
                value={selectedDriver}
                onChange={(e) => setSelectedDriver(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:border-indigo-500 mb-4"
                required
              >
                <option value="">Choose available driver</option>
                {drivers.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d._id} - {d.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:border-indigo-500 mb-4"
                required
              >
                <option value="">Choose vehicle</option>
                {vehicles.map((v) => (
                  <option key={v._id} value={v._id}>
                    {v.plateNumber || v.registration || v.plate || v._id}
                  </option>
                ))}
              </select>

              <button
                disabled={submitting}
                className="mt-2 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-semibold"
              >
                {submitting ? "Assigning..." : "Assign Order"}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default AssignOrder;