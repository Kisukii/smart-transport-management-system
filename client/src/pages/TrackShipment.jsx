import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const steps = [
  "Pending",
  "Assigned",
  "Accepted",
  "Picked Up",
  "In Transit",
  "Delivered",
];

const TrackShipment = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrder(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load shipment");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Shipment not found
      </div>
    );
  }

  const currentStep = steps.indexOf(order.status);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="p-8">

        <button
          onClick={() => navigate("/my-orders")}
          className="mb-6 bg-slate-800 hover:bg-indigo-600 px-5 py-3 rounded-xl"
        >
          Back
        </button>

        <h1 className="text-3xl font-bold mb-8">
          Track Shipment
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-slate-900 rounded-3xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Order Details
            </h2>

            <div className="space-y-4">

              <div>
                <p className="text-slate-400">Order ID</p>
                <h3>{order.orderId}</h3>
              </div>

              <div>
                <p className="text-slate-400">Customer</p>
                <h3>{order.customerName}</h3>
              </div>

              <div>
                <p className="text-slate-400">Pickup</p>
                <h3>{order.pickupLocation}</h3>
              </div>

              <div>
                <p className="text-slate-400">Drop</p>
                <h3>{order.dropLocation}</h3>
              </div>

              <div>
                <p className="text-slate-400">Package</p>
                <h3>{order.packageType}</h3>
              </div>

            </div>

          </div>

          <div className="bg-slate-900 rounded-3xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Shipment Details
            </h2>

            <div className="space-y-4">

              <div>
                <p className="text-slate-400">Driver</p>
                <h3>
                  {order.driver
                    ? order.driver.name
                    : "Not Assigned"}
                </h3>
              </div>

              <div>
                <p className="text-slate-400">Vehicle</p>
                <h3>
                  {order.vehicle
                    ? order.vehicle.vehicleNumber
                    : "Not Assigned"}
                </h3>
              </div>

              
<div className="space-y-6">
                <p className="text-slate-400">Current Status</p>

                <span className=" bg-green-600  px-4 py-2 rounded-full mb-6">
                  {order.status}
                </span>
              </div>
              
            </div>

            <button
              onClick={() =>
                navigate("/navigation", {
                  state: {
                    orderId: order.orderId,
                    pickupLocation: order.pickupLocation,
                    dropLocation: order.dropLocation,
                  },
                })
              }
              className="mt-8 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl"
            >
              View Route
            </button>

          </div>

        </div>
<div className="bg-slate-900 rounded-3xl p-8 mt-8">
  <h2 className="text-2xl font-bold mb-10">
    Delivery Progress
  </h2>

  <div className="relative flex justify-between items-center">

    {/* Progress Line */}
    <div className="absolute left-0 top-5 w-full h-1 bg-slate-700 rounded-full"></div>

    {/* Active Line */}
    <div
      className="absolute left-0 top-5 h-1 bg-green-500 rounded-full transition-all duration-700"
      style={{
        width: `${(currentStep / (steps.length - 1)) * 100}%`,
      }}
    ></div>

    {steps.map((step, index) => (
      <div
        key={step}
        className="relative z-10 flex flex-col items-center w-full"
      >
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500
          ${
            index < currentStep
              ? "bg-green-500 text-white"
              : index === currentStep
              ? "bg-indigo-600 text-white scale-110 ring-4 ring-indigo-400/30"
              : "bg-slate-700 text-slate-400"
          }`}
        >
          {index < currentStep ? "✓" : index + 1}
        </div>

        <p
          className={`mt-3 text-sm text-center font-medium
          ${
            index <= currentStep
              ? "text-white"
              : "text-slate-500"
          }`}
        >
          {step}
        </p>
      </div>
    ))}
  </div>
</div>
       

      </main>
    </div>
  );
};

export default TrackShipment;