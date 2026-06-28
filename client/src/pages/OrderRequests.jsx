import { useNavigate } from "react-router-dom";

const OrderRequests = () => {
  const navigate = useNavigate();

  const pendingOrders = [
    {
      _id: "ORD001",
      customerName: "Anu Joseph",
      pickupLocation: "Kochi",
      dropLocation: "Trivandrum",
      packageDetails: "Electronics package",
      status: "Pending",
    },
    {
      _id: "ORD002",
      customerName: "Rahul Nair",
      pickupLocation: "Ernakulam",
      dropLocation: "Thrissur",
      packageDetails: "Documents",
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-8">Order Requests</h1>

        <div className="grid grid-cols-2 gap-6">
          {pendingOrders.map((order) => (
            <div
              key={order._id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl"
            >
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-bold">{order._id}</h2>
                <span className="bg-yellow-500/10 text-yellow-400 px-4 py-2 rounded-full text-sm">
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

              <button
                onClick={() => navigate(`/assign-order/${order._id}`)}
                className="bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded-xl font-semibold"
              >
                Assign Driver
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default OrderRequests;