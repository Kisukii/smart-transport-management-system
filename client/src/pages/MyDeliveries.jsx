import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyDeliveries = () => {
  const navigate = useNavigate();

  /*
useEffect(() => {
  const fetchDeliveries = async () => {
    try {
      const driverId = localStorage.getItem("driverId");

      const response = await axios.get(
        `http://localhost:5000/api/driver/${driverId}/deliveries`
      );

      setDeliveries(response.data.deliveries);
    } catch (error) {
      console.log(error);
    }
  };

  fetchDeliveries();
}, []);
*/

  const [deliveries, setDeliveries] = useState([
    {
      id: 1,
      customer: "Rahul Nair",
      pickup: "Warehouse A, Kochi",
      drop: "MG Road, Ernakulam",
      status: "Pending",
    },
    {
      id: 2,
      customer: "Anjana Thomas",
      pickup: "Warehouse B, Trivandrum",
      drop: "Pattom, Trivandrum",
      status: "In Transit",
    },
  ]);

  const handleLogout = () => {
    localStorage.removeItem("driverToken");
    navigate("/");
  };

  const confirmDelivery = (id) => {
    setDeliveries(
      deliveries.map((delivery) =>
        delivery.id === id
          ? { ...delivery, status: "Delivered" }
          : delivery
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-900 border-r border-slate-800 p-6">
        <h1 className="text-2xl font-bold mb-10">🚚 Driver Panel</h1>

        <nav className="space-y-3">
          <button onClick={() => navigate("/driverdashboard")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"> Dashboard</button>
          <button className="w-full text-left bg-indigo-600 p-3 rounded-xl"> My Deliveries</button>
          <button onClick={() => navigate("/navigation")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"> Route Navigation</button>
          <button onClick={() => navigate("/vehiclestatus")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"> Vehicle Status</button>
          <button onClick={() => navigate("/report-issue")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl">Vehicle Issue Report</button>
          <button onClick={() => navigate("/drivernotifications")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"> Notifications</button>
          <button onClick={() => navigate("/driverprofile")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"> Driver Profile</button>
        </nav>

        <button onClick={handleLogout} className="absolute bottom-6 left-6 right-6 text-left bg-red-500/10 text-red-400 hover:bg-red-600 hover:text-white p-3 rounded-xl">
           Logout
        </button>
      </aside>

      <main className="ml-72 p-8">
        <h2 className="text-4xl font-bold mb-2">My Deliveries</h2>
        <p className="text-slate-400 mb-8">View and confirm assigned deliveries</p>

        <div className="space-y-5">
          {deliveries.map((delivery) => (
            <div key={delivery.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <div className="grid grid-cols-5 gap-4 items-center">
                <div>
                  <p className="text-slate-400">Customer</p>
                  <h3 className="font-semibold">{delivery.customer}</h3>
                </div>

                <div>
                  <p className="text-slate-400">Pickup</p>
                  <h3>{delivery.pickup}</h3>
                </div>

                <div>
                  <p className="text-slate-400">Drop</p>
                  <h3>{delivery.drop}</h3>
                </div>

                <div>
                  <p className="text-slate-400">Status</p>
                  <h3 className={delivery.status === "Delivered" ? "text-green-400" : "text-yellow-400"}>
                    {delivery.status}
                  </h3>
                </div>

                <div>
                  <button
                    onClick={() => confirmDelivery(delivery.id)}
                    disabled={delivery.status === "Delivered"}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 px-4 py-3 rounded-xl"
                  >
                    Confirm Delivery
                  </button>
                </div>
              </div>

              <div className="mt-5 bg-slate-800 rounded-2xl p-4">
                <h4 className="font-semibold mb-2">Delivery Confirmation</h4>
                <p className="text-slate-400 text-sm">
                  Driver can confirm once the package reaches the customer.
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MyDeliveries;