import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ManagerDashboard from "./pages/ManagerDashboard";
import NewOrder from "./pages/NewOrder";
import Tracking from "./pages/Tracking";
import DriverManagement from "./pages/DriverManagement";
import MyOrders from "./pages/MyOrders";
import VehicleManagement from "./pages/VehicleManagement";
import AdminDashboard from "./pages/AdminDashboard";
// driver
import DriverDashboard from "./pages/DriverDashboard";
import DriverLogin from "./pages/DriverLogin";
import DriverProfile from "./pages/DriverProfile";
import DriverNotifications from "./pages/DriverNotifications";
import MyDeliveries from "./pages/MyDeliveries";
import VehicleIssueReport from "./pages/VehicleIssueReport";
import RouteNavigation from "./pages/RouteNavigation";
import DeliveryConfirmation from "./pages/DeliveryConfirmation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/manager" element={<ManagerDashboard />} />
      <Route path="/neworder" element={<NewOrder />} />
      <Route path="/tracking" element={<Tracking />} />
      <Route path="/drivers" element={<DriverManagement />} />
      <Route path="/orders" element={<MyOrders />} />
      <Route path="/vehicles" element={<VehicleManagement />} />
      <Route path="/admin" element={<AdminDashboard />} />
      {/* driver 
      <Route path="/" element={<DriverLogin />} />*/}
        <Route path="/driver" element={<DriverDashboard />} />
        <Route path="/profile" element={<DriverProfile />} />
        <Route path="/notifications" element={<DriverNotifications />} />
        <Route path="/deliveries" element={<MyDeliveries />} />
        <Route path="/report-issue" element={<VehicleIssueReport />} />
        <Route path="/navigation" element={<RouteNavigation />} />
        <Route path="/confirmation" element={<DeliveryConfirmation />} />
    </Routes>
  );
}

export default App;