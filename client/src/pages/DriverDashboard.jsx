// import { useEffect, useState } from "react";
// import axios from "axios";

// const DriverDashboard = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     loadOrders();
//   }, []);

//   const loadOrders = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.get(
//         "http://localhost:5000/api/order/drivers",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setOrders(res.data);
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           "Failed to load assigned orders."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateStatus = async (orderId, status) => {
//     try {
//       const token = localStorage.getItem("token");

//       await axios.put(
//         `http://localhost:5000/api/order/${orderId}/status`,
//         { status },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       loadOrders();
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to update status");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-white text-xl">
//         Loading...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-red-500 text-xl">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-950 text-white p-8">

//       <h1 className="text-4xl font-bold mb-8">
//         Driver Dashboard
//       </h1>

//       {orders.length === 0 ? (
//         <div className="bg-slate-900 rounded-2xl p-8 text-center">
//           No assigned orders.
//         </div>
//       ) : (
//         <div className="grid md:grid-cols-2 gap-6">

//           {orders.map((order) => (

//             <div
//               key={order._id}
//               className="bg-slate-900 rounded-2xl p-6 shadow-lg"
//             >

//               <div className="flex justify-between mb-5">

//                 <h2 className="font-bold text-xl">
//                   {order.orderId}
//                 </h2>

//                 <span className="bg-cyan-600 px-3 py-1 rounded-full text-sm">
//                   {order.status}
//                 </span>

//               </div>

//               <p><strong>Customer :</strong> {order.customerName}</p>

//               <p><strong>Phone :</strong> {order.phone}</p>

//               <p><strong>Pickup :</strong> {order.pickupLocation}</p>

//               <p><strong>Drop :</strong> {order.dropLocation}</p>

//               <p><strong>Vehicle :</strong> {order.vehicle?.vehicleNumber}</p>

//               <p><strong>Vehicle ID :</strong> {order.vehicle?.vehicleId}</p>

//               <p><strong>Type :</strong> {order.vehicle?.type}</p>

//               <p><strong>Capacity :</strong> {order.vehicle?.capacity} kg</p>

//               <div className="mt-6 flex flex-wrap gap-3">

//                 {order.status === "Assigned" && (
//                   <>
//                     <button
//                       onClick={() =>
//                         updateStatus(order._id, "Accepted")
//                       }
//                       className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl"
//                     >
//                       Accept
//                     </button>

//                     <button
//                       onClick={() =>
//                         updateStatus(order._id, "Rejected")
//                       }
//                       className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl"
//                     >
//                       Reject
//                     </button>
//                   </>
//                 )}

//                 {order.status === "Accepted" && (
//                   <button
//                     onClick={() =>
//                       updateStatus(order._id, "Picked Up")
//                     }
//                     className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl"
//                   >
//                     Picked Up
//                   </button>
//                 )}

//                 {order.status === "Picked Up" && (
//                   <button
//                     onClick={() =>
//                       updateStatus(order._id, "In Transit")
//                     }
//                     className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-xl"
//                   >
//                     In Transit
//                   </button>
//                 )}

//                 {order.status === "In Transit" && (
//                   <button
//                     onClick={() =>
//                       updateStatus(order._id, "Delivered")
//                     }
//                     className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl"
//                   >
//                     Delivered
//                   </button>
//                 )}

//               </div>

//             </div>

//           ))}

//         </div>
//       )}

//     </div>
//   );
// };

// export default DriverDashboard;