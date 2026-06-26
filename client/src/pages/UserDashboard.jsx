import UserLayout from "./UserLayout";

const UserDashboard = () => {
  return (
    <UserLayout>
      <h1 className="text-3xl font-bold mb-6 text-white">User Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800">
          <p className="text-slate-400">Total Deliveries</p>
          <h2 className="text-3xl font-bold text-blue-600">12</h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800">
          <p className="text-slate-400">In Transit</p>
          <h2 className="text-3xl font-bold text-yellow-600">3</h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800">
          <p className="text-slate-400">Delivered</p>
          <h2 className="text-3xl font-bold text-green-600">8</h2>
        </div>

       <div className="bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800">
          <p className="text-slate-400">Pending</p>
          <h2 className="text-3xl font-bold text-red-600">1</h2>
        </div>
      </div>

      <div className="bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800">
        <h2 className="text-xl font-semibold mb-4">Recent Shipment</h2>
        <p><b>Tracking ID:</b> TRK12345</p>
        <p><b>Status:</b> In Transit</p>
        <p><b>Current Location:</b> Kochi Hub</p>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;