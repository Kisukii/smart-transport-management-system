import { useNavigate } from "react-router-dom";

const NewOrderRequests = () => {
  const navigate = useNavigate();

  const assignedOrders = [
    {
      _id: "ORD001",
      pickupLocation: "Kochi",
      dropLocation: "Trivandrum",
      customerName: "Anu Joseph",
      packageDetails: "Electronics package",
      status: "Assigned",
    },
    {
      _id: "ORD002",
      pickupLocation: "Ernakulam",
      dropLocation: "Thrissur",
      customerName: "Rahul Nair",
      packageDetails: "Documents",
      status: "Assigned",
    },
  ];

  const handleAccept = (orderId) => {
    console.log("Accept order:", orderId);

    // Backend later:
    // PUT /api/orders/:id/accept

    navigate("/driverdeliveries");
  };

  const handleReject = (orderId) => {
    console.log("Reject order:", orderId);

    // Backend later:
    // PUT /api/orders/:id/reject
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-8">New Order Requests</h1>

        <div className="grid grid-cols-2 gap-6">
          {assignedOrders.map((order) => (
            <div
              key={order._id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl"
            >
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-bold">{order._id}</h2>
                <span className="bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm">
                  {order.status}
                </span>
              </div>

              <p className="text-slate-400">Customer</p>
              <p className="mb-3">{order.customerName}</p>

              <p className="text-slate-400">Pickup</p>
              <p className="mb-3">{order.pickupLocation}</p>

              <p className="text-slate-400">Drop</p>
              <p className="mb-3">{order.dropLocation}</p>

              <p className="text-slate-400">Package</p>
              <p className="mb-5">{order.packageDetails}</p>

              <div className="flex gap-4">
                <button
                  onClick={() => handleAccept(order._id)}
                  className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl font-semibold"
                >
                  Accept
                </button>

                <button
                  onClick={() => handleReject(order._id)}
                  className="bg-red-500/10 text-red-400 hover:bg-red-600 hover:text-white px-5 py-3 rounded-xl font-semibold"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default NewOrderRequests;