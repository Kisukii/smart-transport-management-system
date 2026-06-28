import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AssignOrder = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedDriver, setSelectedDriver] = useState("");

  const order = {
    _id: id,
    customerName: "Anu Joseph",
    pickupLocation: "Kochi",
    dropLocation: "Trivandrum",
    packageDetails: "Electronics package",
    status: "Pending",
  };

  const availableDrivers = [
    {
      _id: "DRV001",
      name: "Rahul Nair",
      vehicleNumber: "KL-01-AB-2345",
      status: "Available",
    },
    {
      _id: "DRV002",
      name: "Arjun K",
      vehicleNumber: "KL-07-CD-8899",
      status: "Available",
    },
  ];

  const handleAssign = (e) => {
    e.preventDefault();

    const assignData = {
      orderId: order._id,
      driverId: selectedDriver,
      status: "Assigned",
    };

    console.log("Send this to backend:", assignData);

    // Backend later:
    // PUT /api/orders/:id/assign

    navigate("/order-requests");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="p-8">
        <button
          onClick={() => navigate("/order-requests")}
          className="mb-6 bg-slate-800 hover:bg-indigo-600 px-5 py-3 rounded-xl"
        >
          Back to Order Requests
        </button>

        <h1 className="text-3xl font-bold mb-8">Assign Order</h1>

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
            <p>{order.packageDetails}</p>
          </div>

          <form
            onSubmit={handleAssign}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-5">Select Driver</h2>

            <select
              value={selectedDriver}
              onChange={(e) => setSelectedDriver(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:border-indigo-500"
              required
            >
              <option value="">Choose available driver</option>

              {availableDrivers.map((driver) => (
                <option key={driver._id} value={driver._id}>
                  {driver._id} - {driver.name} - {driver.vehicleNumber}
                </option>
              ))}
            </select>

            <button className="mt-6 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-semibold">
              Assign Order
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AssignOrder;