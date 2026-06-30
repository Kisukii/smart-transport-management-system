// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";

// const DriverNotification = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("driverToken");
//     navigate("/");
//   };

//  const [notifications, setNotifications] = useState([
//     {
//       title: "New Delivery Assigned",
//       message: "You have been assigned a delivery to MG Road, Ernakulam.",
//       time: "10 mins ago",
//     },
//     {
//       title: "Vehicle Maintenance Reminder",
//       message: "Vehicle KL-01-AB-2345 is due for inspection this week.",
//       time: "1 hour ago",
//     },
//     {
//       title: "Delivery Completed",
//       message: "Your delivery to Pattom has been marked as completed.",
//       time: "Yesterday",
//     },
//   ]);

//   /*
// useEffect(() => {
//   const fetchNotifications = async () => {
//     try {
//       const driverId = localStorage.getItem("driverId");

//       const response = await axios.get(
//         `http://localhost:5000/api/driver/${driverId}/notifications`
//       );

//       setNotifications(response.data.notifications);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   fetchNotifications();
// }, []);
// */

//   return (
//     <div className="min-h-screen bg-slate-950 text-white">
//       <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-900 border-r border-slate-800 p-6">
//         <h1 className="text-2xl font-bold mb-10">🚚 Driver Panel</h1>

//         <nav className="space-y-3">
//           <button onClick={() => navigate("/driver")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"> Dashboard</button>
//           <button onClick={() => navigate("/driverdeliveries")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"> My Deliveries</button>
//           <button onClick={() => navigate("/navigation")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"> Route Navigation</button>
//           <button onClick={() => navigate("/vehiclestatus")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"> Vehicle Status</button>
//           <button onClick={() => navigate("/report-issue")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"> Vehicle Issue Report</button>
//           <button className="w-full text-left bg-indigo-600 p-3 rounded-xl"> Notifications</button>
//           <button onClick={() => navigate("/driver/profile")} className="w-full text-left hover:bg-slate-800 p-3 rounded-xl"> Driver Profile</button>
//         </nav>

//         <button onClick={handleLogout} className="absolute bottom-6 left-6 right-6 text-left bg-red-500/10 text-red-400 hover:bg-red-600 hover:text-white p-3 rounded-xl">
//            Logout
//         </button>
//       </aside>

//       <main className="ml-72 p-8">
//         <h2 className="text-4xl font-bold mb-2">Driver Notifications</h2>
//         <p className="text-slate-400 mb-8">Recent updates and alerts</p>

//         <div className="space-y-5 max-w-4xl">
//           {notifications.map((note, index) => (
//             <div key={index} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
//               <div className="flex justify-between">
//                 <h3 className="text-xl font-bold">{note.title}</h3>
//                 <span className="text-slate-500">{note.time}</span>
//               </div>
//               <p className="text-slate-400 mt-3">{note.message}</p>
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DriverNotification;