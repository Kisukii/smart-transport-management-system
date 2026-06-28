
import { useState, useEffect } from "react";

function MyOrders({ goBack }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Temporary dummy data
    setOrders([
      {
        orderId: "ORD001",
        pickup: "Thrissur",
        destination: "Kochi",
        status: "In Transit",
      },
      {
        orderId: "ORD002",
        pickup: "Palakkad",
        destination: "Calicut",
        status: "Delivered",
      },
      {
        orderId: "ORD003",
        pickup: "Ernakulam",
        destination: "Trivandrum",
        status: "Pending",
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">
      <h1 className="text-4xl font-bold mb-8">My Orders</h1>

      <button
        onClick={goBack}
        className="mb-6 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-xl"
      >
        ← Back to Dashboard
      </button>

      <div className="bg-[#1e293b] rounded-2xl p-6">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-slate-600">
              <th className="pb-4">Order ID</th>
              <th>Pickup</th>
              <th>Destination</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-b border-slate-700">
                <td className="py-4 font-semibold">
                  {order.orderId}
                </td>

                <td>{order.pickup}</td>

                <td>{order.destination}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-lg text-sm ${
                      order.status === "Delivered"
                        ? "bg-green-600"
                        : order.status === "In Transit"
                        ? "bg-blue-600"
                        : "bg-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyOrders;

