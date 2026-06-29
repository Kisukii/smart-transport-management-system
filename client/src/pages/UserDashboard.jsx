import { useNavigate } from "react-router-dom";
 import UserLayout from "./UserLayout";

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="mb-8 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-white">Welcome back, Customer</h1>
        <p className="text-indigo-100 mt-2">
          Track your shipments, view delivery updates, and manage your orders easily.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:scale-105 transition">
          <p className="text-slate-400">Total Deliveries</p>
          <h2 className="text-4xl font-bold mt-3 text-white">12</h2>
          <p className="text-slate-500 text-sm mt-2">All shipments</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:scale-105 transition">
          <p className="text-slate-400">In Transit</p>
          <h2 className="text-4xl font-bold mt-3 text-yellow-400">3</h2>
          <p className="text-slate-500 text-sm mt-2">Currently moving</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:scale-105 transition">
          <p className="text-slate-400">Delivered</p>
          <h2 className="text-4xl font-bold mt-3 text-green-400">8</h2>
          <p className="text-slate-500 text-sm mt-2">Completed orders</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:scale-105 transition">
          <p className="text-slate-400">Pending</p>
          <h2 className="text-4xl font-bold mt-3 text-cyan-400">1</h2>
          <p className="text-slate-500 text-sm mt-2">Waiting for pickup</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Current Shipment</h2>
            <span className="bg-yellow-500/10 text-yellow-400 px-4 py-2 rounded-full text-sm">
              In Transit
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-800 rounded-2xl p-5">
              <p className="text-slate-400 text-sm">Tracking ID</p>
              <h3 className="text-lg font-semibold mt-1">TRK12345</h3>
            </div>

            <div className="bg-slate-800 rounded-2xl p-5">
              <p className="text-slate-400 text-sm">Current Location</p>
              <h3 className="text-lg font-semibold mt-1">Kochi Hub</h3>
            </div>

            <div className="bg-slate-800 rounded-2xl p-5">
              <p className="text-slate-400 text-sm">Expected Delivery</p>
              <h3 className="text-lg font-semibold mt-1">Today, 6:30 PM</h3>
            </div>

            <div className="bg-slate-800 rounded-2xl p-5">
              <p className="text-slate-400 text-sm">Assigned Driver</p>
              <h3 className="text-lg font-semibold mt-1">Rahul Nair</h3>
            </div>
          </div>

          <button
            onClick={() => navigate("/user/track-shipment")}
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-semibold"
          >
            Track Shipment
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold mb-5 text-white">Quick Actions</h2>

          <div className="space-y-4">
            <button
              onClick={() => navigate("/user/track-shipment")}
              className="w-full bg-slate-800 hover:bg-indigo-600 p-4 rounded-2xl text-left"
            >
               Track Shipment
            </button>

            <button
              onClick={() => navigate("/user/delivery-history")}
              className="w-full bg-slate-800 hover:bg-indigo-600 p-4 rounded-2xl text-left"
            >
               Delivery History
            </button>

            <button
              onClick={() => navigate("/user/download-receipt")}
              className="w-full bg-slate-800 hover:bg-indigo-600 p-4 rounded-2xl text-left"
            >
               Download Receipt
            </button>

            <button
              onClick={() => navigate("/user/order")}
              className="w-full bg-slate-800 hover:bg-indigo-600 p-4 rounded-2xl text-left"
            >
               Notifications
            </button>
          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold mb-4 text-white">Shipment Progress</h2>

          <div className="w-full bg-slate-800 rounded-full h-4">
            <div className="bg-indigo-600 h-4 rounded-full w-3/4"></div>
          </div>

          <p className="text-slate-400 mt-3">
            Order confirmed → Picked up → In transit
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold mb-4 text-white">Latest Update</h2>
          <p className="text-slate-300">
            Your shipment has reached the Kochi Distribution Hub and is expected
            to be delivered today.
          </p>
        </div> */}
      {/* </div> */}
    </>
  );
};

export default UserDashboard;