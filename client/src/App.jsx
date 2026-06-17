import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ManagerDashboard from "./pages/ManagerDashboard";
import NewOrder from "./pages/NewOrder";
import Tracking from "./pages/Tracking";
import DriverManagement from "./pages/DriverManagement";
import MyOrders from "./pages/MyOrders";
import VehicleManagement from "./pages/VehicleManagement";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ManagerDashboard />} />
      <Route path="/neworder" element={<NewOrder />} />
      <Route path="/tracking" element={<Tracking />} />
      <Route path="/drivers" element={<DriverManagement />} />
      <Route path="/orders" element={<MyOrders />} />
      <Route path="/vehicles" element={<VehicleManagement />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;