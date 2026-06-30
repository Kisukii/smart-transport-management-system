import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserDashboard = () => {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] =useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/orders/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDashboard(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white text-2xl">
        Loading Dashboard...
      </div>
    );
  }

  const shipment = dashboard?.currentShipment;

  return (
    <>
      {/* Hero Section */}
      <div className="mb-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-white">
          Welcome Back!
        </h1>

        <p className="text-indigo-100 mt-3 text-lg">
          Track your shipments and stay updated with every delivery.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl">
          <p className="text-slate-400">Total Orders</p>
          <h2 className="text-4xl font-bold mt-3">
            {dashboard?.total || 0}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl">
          <p className="text-slate-400">Pending</p>
          <h2 className="text-4xl font-bold mt-3 text-cyan-400">
            {dashboard?.pending || 0}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl">
          <p className="text-slate-400">In Transit</p>
          <h2 className="text-4xl font-bold mt-3 text-yellow-400">
            {dashboard?.transit || 0}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl">
          <p className="text-slate-400">Delivered</p>
          <h2 className="text-4xl font-bold mt-3 text-green-400">
            {dashboard?.delivered || 0}
          </h2>
        </div>

      </div>

      {/* Current Shipment */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 shadow-xl">

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">
            Current Shipment
          </h2>

          {shipment ? (
            <span className="bg-yellow-500/20 text-yellow-400 px-5 py-2 rounded-full font-medium">
              {shipment.status}
            </span>
          ) : (
            <span className="bg-slate-700 px-5 py-2 rounded-full">
              No Active Shipment
            </span>
          )}
        </div>

        {shipment ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              <div className="bg-slate-800 rounded-2xl p-6">
                <p className="text-slate-400 text-sm">
                  Tracking ID
                </p>

                <h3 className="text-xl font-semibold mt-2">
                  {shipment.orderId}
                </h3>
              </div>

              <div className="bg-slate-800 rounded-2xl p-6">
                <p className="text-slate-400 text-sm">
                  Pickup Location
                </p>

                <h3 className="text-xl font-semibold mt-2">
                  {shipment.pickupLocation}
                </h3>
              </div>

              <div className="bg-slate-800 rounded-2xl p-6">
                <p className="text-slate-400 text-sm">
                  Drop Location
                </p>

                <h3 className="text-xl font-semibold mt-2">
                  {shipment.dropLocation}
                </h3>
              </div>

              <div className="bg-slate-800 rounded-2xl p-6">
                <p className="text-slate-400 text-sm">
                  Driver
                </p>

                <h3 className="text-xl font-semibold mt-2">
                  {shipment.driver?.name || "Not Assigned"}
                </h3>
              </div>

              <div className="bg-slate-800 rounded-2xl p-6">
                <p className="text-slate-400 text-sm">
                  Vehicle
                </p>

                <h3 className="text-xl font-semibold mt-2">
                  {shipment.vehicle?.vehicleNumber || "Not Assigned"}
                </h3>
              </div>

             
              <div className="bg-slate-800 rounded-2xl p-6">
                <p className="text-slate-400 text-sm">
                  Package Type
                </p>

                <h3 className="text-xl font-semibold mt-2">
                  {shipment.packageType}
                </h3>
              </div>

             

            </div>

            <div className="mt-10 flex justify-center">
              <button
                onClick={() =>
                  navigate(`/track-shipment/${shipment.orderId}`)
                }
                className="bg-indigo-600 hover:bg-indigo-700 transition px-8 py-4 rounded-xl text-lg font-semibold"
              >
                Track Shipment
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-16">

            <div className="text-7xl mb-4">📦</div>

            <h2 className="text-2xl font-bold">
              No Active Shipment
            </h2>

            <p className="text-slate-400 mt-3">
              You don't have any active deliveries at the moment.
            </p>

            <button
              onClick={() => navigate("/place-order")}
              className="mt-8 bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-xl font-semibold"
            >
              Place New Order
            </button>

          </div>
        )}

      </div>
    </>
  );
};

export default UserDashboard;