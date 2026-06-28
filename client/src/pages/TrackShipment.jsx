import { useNavigate, useParams } from "react-router-dom";

const TrackShipment = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Dummy data for now
  // Backend later:
  // GET /api/orders/:id

  const order = {
    _id: id,
    pickupLocation: "Kochi",
    dropLocation: "Trivandrum",
    receiverName: "Anu Joseph",
    assignedDriver: "DRV001 - Rahul Nair",
    vehicleNumber: "KL-01-AB-2345",
    status: "In Transit",
    estimatedTime: "45 Minutes",
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="p-8">
        <button
          onClick={() => navigate("/my-orders")}
          className="mb-6 bg-slate-800 hover:bg-indigo-600 px-5 py-3 rounded-xl"
        >
          Back to My Orders
        </button>

        <h1 className="text-3xl font-bold mb-8">Track Shipment</h1>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">

            <h2 className="text-2xl font-bold mb-6">
              Order Details
            </h2>

            <div className="space-y-4">

              <div>
                <p className="text-slate-400">Order ID</p>
                <h3>{order._id}</h3>
              </div>

              <div>
                <p className="text-slate-400">Pickup Location</p>
                <h3>{order.pickupLocation}</h3>
              </div>

              <div>
                <p className="text-slate-400">Drop Location</p>
                <h3>{order.dropLocation}</h3>
              </div>

              <div>
                <p className="text-slate-400">Receiver</p>
                <h3>{order.receiverName}</h3>
              </div>

            </div>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">

            <h2 className="text-2xl font-bold mb-6">
              Shipment Status
            </h2>

            <div className="space-y-4">

              <div>
                <p className="text-slate-400">Assigned Driver</p>
                <h3>{order.assignedDriver}</h3>
              </div>

              <div>
                <p className="text-slate-400">Vehicle Number</p>
                <h3>{order.vehicleNumber}</h3>
              </div>

              <div>
                <p className="text-slate-400">Current Status</p>

                <span className="bg-yellow-500/10 text-yellow-400 px-4 py-2 rounded-full text-sm">
                  {order.status}
                </span>

              </div>

              <div>
                <p className="text-slate-400">Estimated Arrival</p>
                <h3>{order.estimatedTime}</h3>
              </div>

            </div>

            <button
              onClick={() => navigate("/navigation")}
              className="mt-8 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-semibold"
            >
              View Route
            </button>

          </div>
        </div>

        {/* Backend Integration

        GET /api/orders/:id

        Expected Response

        {
          _id,
          pickupLocation,
          dropLocation,
          receiverName,
          assignedDriver,
          vehicleNumber,
          status,
          estimatedTime
        }

        */}
      </main>
    </div>
  );
};

export default TrackShipment;