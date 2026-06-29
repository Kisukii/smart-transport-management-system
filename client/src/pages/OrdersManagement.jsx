import { useEffect, useState } from "react";
import axios from "axios";

const OrdersManagement = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");


  const fetchOrders = async () => {
    try {

      const token = localStorage.getItem("token");

      // Fetch both order requests (customer-submitted) and confirmed orders
      const [reqRes, ordRes] = await Promise.all([
        axios
          .get("http://localhost:5000/api/orderrequests", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .catch(() => ({ data: [] })),
        axios
          .get("http://localhost:5000/api/orders", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .catch(() => ({ data: [] })),
      ]);

      const reqData = Array.isArray(reqRes.data)
        ? reqRes.data
        : reqRes.data.requests || reqRes.data.data || [];

      const ordData = Array.isArray(ordRes.data)
        ? ordRes.data
        : ordRes.data.orders || ordRes.data.data || [];

      // Merge and sort newest first
      const merged = [...reqData, ...ordData].sort((a, b) => {
        const ta = new Date(a.createdAt || a.created_at || 0).getTime();
        const tb = new Date(b.createdAt || b.created_at || 0).getTime();
        return tb - ta;
      });

      setOrders(merged);


    } catch (error) {

      console.log(
        "Fetch orders error:",
        error.response?.data || error.message
      );

    } finally {

      setLoading(false);

    }
  };



  useEffect(() => {
    fetchOrders();
  }, []);




  const q = searchTerm.trim().toLowerCase();

  const filteredOrders = orders.filter((o) => {
    if (!q) return true;
    const phone = (o.customerPhone || o.phone || "").toString().toLowerCase();
    const name = (o.customerName || "").toString().toLowerCase();
    const pickup = (o.pickupLocation || "").toString().toLowerCase();
    const drop = (o.dropLocation || "").toString().toLowerCase();
    const id = (o.orderId || o._id || "").toString().toLowerCase();
    return (
      name.includes(q) || phone.includes(q) || pickup.includes(q) || drop.includes(q) || id.includes(q)
    );
  });

  if (loading) {
    return (
      <div className="p-10 text-white">
        Loading orders...
      </div>
    );
  }



  return (

    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Orders Management</h1>
          </div>
        <div />
      </div>


      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">


        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <p className="text-slate-400">
            Total Orders
          </p>

            <h2 className="text-3xl font-bold">{filteredOrders.length}</h2>
        </div>



        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

          <p className="text-slate-400">
            Pending
          </p>

            <h2 className="text-3xl text-yellow-400">{filteredOrders.filter((o) => (o.status || "Pending") === "Pending").length}</h2>

        </div>



        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

          <p className="text-slate-400">
            Assigned
          </p>

            <h2 className="text-3xl text-blue-400">{filteredOrders.filter((o) => o.status === "Assigned").length}</h2>

        </div>




        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

          <p className="text-slate-400">
            Completed
          </p>

            <h2 className="text-3xl text-green-400">{filteredOrders.filter((o) => o.status === "Completed").length}</h2>

        </div>


      </div>


      
          <div className="mt-3 mb-6">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="bg-slate-800 border border-slate-700 rounded-xl p-2 outline-none focus:border-indigo-500 text-white w-80"
            />
          </div>
        




      {/* Table */}

      <div className="
        bg-slate-900
        border border-slate-800
        rounded-2xl
        overflow-hidden
      ">


        <table className="w-full">


          <thead className="bg-slate-800">

            <tr>

              <th className="p-4 text-left">
                Customer
              </th>

              <th className="p-4 text-left">
                Phone
              </th>

              <th className="p-4 text-left">
                Pickup
              </th>

              <th className="p-4 text-left">
                Drop
              </th>

              <th className="p-4 text-left">
                Package
              </th>

              <th className="p-4 text-left">
                Payment
              </th>

              <th className="p-4 text-left">
                Status
              </th>

            </tr>

          </thead>



          <tbody>


          {filteredOrders.length === 0 ? (

            <tr>
              <td
                colSpan="7"
                className="p-8 text-center text-slate-400"
              >
                No orders found
              </td>
            </tr>


          ) : (


            filteredOrders.map((order) => (

              <tr
                key={order._id}
                className="
                  border-t
                  border-slate-800
                  hover:bg-slate-800
                "
              >


                <td className="p-4">
                  {order.customerName}
                </td>


                <td className="p-4">
                  {order.customerPhone || order.phone}
                </td>


                <td className="p-4">
                  {order.pickupLocation}
                </td>


                <td className="p-4">
                  {order.dropLocation}
                </td>


                <td className="p-4">
                  {order.packageType}
                </td>


                <td className="p-4">
                  {order.paymentMethod}
                </td>



                <td className="p-4">


                  <span className="
                    px-3
                    py-1
                    rounded-full
                    bg-yellow-500/20
                    text-yellow-400
                  ">

                    {order.status || "Pending"}

                  </span>


                </td>


              </tr>

            ))

          )}


          </tbody>


        </table>


      </div>


    </div>
  );
};


export default OrdersManagement;