import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ManagerDashboard from "./pages/ManagerDashboard";
import NewOrder from "./pages/NewOrder";
import VehicleTracking from "./pages/VehicleTracking";
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
import VehicleStatus from "./pages/VehicleStatus";
// user
import UserLogin from "./pages/UserLogin";
import UserDashboard from "./pages/UserDashboard";
import UserProfile from "./pages/UserProfile";
import UserNotifications from "./pages/UserNotifications";
import TrackShipment from "./pages/TrackShipment";
import UserDeliveryConfirmation from "./pages/UserDeliveryConfirmation";
import DeliveryHistory from "./pages/DeliveryHistory";
import DownloadReceipt from "./pages/DownloadReceipt";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/manager" element={<ManagerDashboard />} />
      <Route path="/neworder" element={<NewOrder />} />
      <Route path="/tracking" element={<VehicleTracking />} />
      <Route path="/drivers" element={<DriverManagement />} />
      <Route path="/orders" element={<MyOrders />} />
      <Route path="/vehicles" element={<VehicleManagement />} />
      <Route path="/admin" element={<AdminDashboard />} />


      {/* driver */}
      <Route path="/driver" element={<DriverLogin />} />
        <Route path="/driverdashboard" element={<DriverDashboard />} />
        <Route path="/driverprofile" element={<DriverProfile />} />
        <Route path="/drivernotifications" element={<DriverNotifications />} />
        <Route path="/driverdeliveries" element={<MyDeliveries />} />

      {/* driver 
      <Route path="/" element={<DriverLogin />} />*/}
        <Route path="/driver" element={<DriverDashboard />} />
        <Route path="/profile" element={<DriverProfile />} />
        <Route path="/notifications" element={<DriverNotifications />} />
        <Route path="/deliveries" element={<MyDeliveries />} />

        <Route path="/report-issue" element={<VehicleIssueReport />} />
        <Route path="/navigation" element={<RouteNavigation />} />
        <Route path="/vehiclestatus" element={<VehicleStatus />} />
        <Route path="/driverconfirmation" element={<DeliveryConfirmation />} />
        {/* user */}
        <Route path="/user" element={<UserLogin />} />
<Route path="/user/dashboard" element={<UserDashboard />} />
<Route path="/user/profile" element={<UserProfile />} />
<Route path="/user/notifications" element={<UserNotifications />} />
<Route path="/user/track-shipment" element={<TrackShipment />} />
<Route path="/user/delivery-confirmation" element={<UserDeliveryConfirmation />} />
<Route path="/user/delivery-history" element={<DeliveryHistory />} />
<Route path="/user/download-receipt" element={<DownloadReceipt />} />
    </Routes>
  );
}

export default App;