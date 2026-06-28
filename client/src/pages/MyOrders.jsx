import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const navigate = useNavigate();

  const orders = [
    {
      id: "ORD001",
      pickup: "Warehouse A, Kochi",
      drop: "MG Road, Ernakulam",
      status: "Pending",
      driver: "Not assigned",
    },
    {
      id: "ORD002",
      pickup: "Kakkanad",
      drop: "Aluva",
      status: "In Transit",
      driver: "DRV001",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        <div className="grid grid-cols-2 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl"
            >
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-bold">{order.id}</h2>
                <span className="bg-yellow-500/10 text-yellow-400 px-4 py-2 rounded-full text-sm">
                  {order.status}
                </span>
              </div>

              <p className="text-slate-400">Pickup</p>
              <p className="mb-3">{order.pickup}</p>

              <p className="text-slate-400">Drop</p>
              <p className="mb-3">{order.drop}</p>

              <p className="text-slate-400">Driver</p>
              <p className="mb-5">{order.driver}</p>

              <button
                onClick={() => navigate(`/track-shipment/${order.id}`)}
                className="bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded-xl font-semibold"
              >
                Track Shipment
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MyOrders;