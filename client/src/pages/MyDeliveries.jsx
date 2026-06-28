import { useNavigate } from "react-router-dom";

const MyDeliveries = () => {
  const navigate = useNavigate();

  const deliveries = [
    {
      _id: "ORD001",
      customerName: "Anu Joseph",
      pickupLocation: "Kochi",
      dropLocation: "Trivandrum",
      packageDetails: "Electronics package",
      status: "Accepted",
      estimatedTime: "45 minutes",
    },
    {
      _id: "ORD003",
      customerName: "Vivek Kumar",
      pickupLocation: "Kakkanad",
      dropLocation: "Aluva",
      packageDetails: "Documents",
      status: "In Transit",
      estimatedTime: "30 minutes",
    },
  ];

  const handleConfirmDelivery = (orderId) => {
    console.log("Confirm delivery:", orderId);

    // Backend later:
    // PUT /api/orders/:id/status
    // status: "Delivered"
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-8">My Deliveries</h1>

        <div className="grid grid-cols-2 gap-6">
          {deliveries.map((delivery) => (
            <div
              key={delivery._id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl"
            >
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-bold">{delivery._id}</h2>
                <span className="bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm">
                  {delivery.status}
                </span>
              </div>

              <p className="text-slate-400">Customer</p>
              <p className="mb-3">{delivery.customerName}</p>

              <p className="text-slate-400">Pickup</p>
              <p className="mb-3">{delivery.pickupLocation}</p>

              <p className="text-slate-400">Drop</p>
              <p className="mb-3">{delivery.dropLocation}</p>

              <p className="text-slate-400">Estimated Time</p>
              <p className="mb-5">{delivery.estimatedTime}</p>

              <div className="flex gap-4">
                <button
                  onClick={() =>
                    navigate("/navigation", {
                      state: {
                        orderId: delivery._id,
                        pickupLocation: delivery.pickupLocation,
                        dropLocation: delivery.dropLocation,
                        estimatedTime: delivery.estimatedTime,
                      },
                    })
                  }
                  className="bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded-xl font-semibold"
                >
                  Route Navigation
                </button>

                <button
                  onClick={() => handleConfirmDelivery(delivery._id)}
                  className="bg-slate-800 hover:bg-green-600 px-5 py-3 rounded-xl font-semibold"
                >
                  Confirm Delivery
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MyDeliveries;