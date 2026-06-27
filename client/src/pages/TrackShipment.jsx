import UserLayout from "./UserLayout";

const TrackShipment = () => {
  return (
    <UserLayout>
      <h1 className="text-3xl font-bold mb-6 text-white">Track Shipment</h1>

      <div className="bg-slate-900 p-6 rounded-2xl shadow">
        <input
          placeholder="Enter Tracking ID"
          className="border p-3 rounded-lg mr-3"
        />

        <button className="bg-blue-600 text-white px-5 py-3 rounded-lg">
          Track
        </button>

        <div className="mt-6 bg-slate-50 p-5 rounded-xl space-y-2">
          <p><b>Tracking ID:</b> TRK12345</p>
          <p><b>Status:</b> In Transit</p>
          <p><b>Current Location:</b> Kochi Hub</p>
          <p><b>Expected Delivery:</b> Tomorrow</p>
        </div>
      </div>
    </UserLayout>
  );
};

export default TrackShipment;