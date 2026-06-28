import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ManagerDashboard from "./pages/ManagerDashboard";
import NewOrder from "./pages/NewOrder";
import Tracking from "./pages/Tracking";
import DriverManagement from "./pages/DriverManagement";
import VehicleManagement from "./pages/VehicleManagement";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
// driver
import DriverDashboard from "./pages/DriverDashboard";

import DriverProfile from "./pages/DriverProfile";
import DriverNotifications from "./pages/DriverNotifications";
import MyDeliveries from "./pages/MyDeliveries";
import VehicleIssueReport from "./pages/VehicleIssueReport";
import RouteNavigation from "./pages/RouteNavigation";
import DeliveryConfirmation from "./pages/DeliveryConfirmation";
import VehicleStatus from "./pages/VehicleStatus";
// user
import CustomerManagement from "./pages/CustomerManagement";
import UserDashboard from "./pages/UserDashboard";
import UserProfile from "./pages/UserProfile";
import UserNotifications from "./pages/UserNotifications";
import UserDeliveryConfirmation from "./pages/UserDeliveryConfirmation";
import DeliveryHistory from "./pages/DeliveryHistory";
import DownloadReceipt from "./pages/DownloadReceipt";
// order flow(newly added)
import PlaceOrder from "./pages/PlaceOrder";
import TrackShipment from "./pages/TrackShipment";
import OrderRequests from "./pages/OrderRequests";
import MyOrders from "./pages/MyOrders";
import AssignOrder from "./pages/AssignOrder";
import NewOrderRequests from "./pages/NewOrderRequests";

// layout
import DriverLayout from "./pages/DriverLayout";
import UserLayout from "./pages/UserLayout";
import ManagerLayout from "./pages/ManagerLayout";
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
      <Route path="/profile" element={<Profile />} />
      <Route path="/customer" element={<CustomerManagement />}/>
      
{/* driver */}
<Route element={<DriverLayout />}>

    <Route path="/driver" element={<DriverDashboard />} />

    <Route path="/driver/new-orders" element={<NewOrderRequests />} />

    <Route path="/driverdeliveries" element={<MyDeliveries />} />

    <Route path="/navigation" element={<RouteNavigation />} />

    <Route path="/vehiclestatus" element={<VehicleStatus />} />

    <Route path="/report-issue" element={<VehicleIssueReport />} />

    <Route path="/drivernotifications" element={<DriverNotifications />} />

    <Route path="/profile" element={<Profile />} />

</Route>


        {/* user */}
       
<Route path="/user" element={<UserDashboard />} />
<Route path="/user/profile" element={<Profile/>} />
<Route path="/user/notifications" element={<UserNotifications />} />
<Route path="/user/track-shipment" element={<TrackShipment />} />
<Route path="/user/delivery-confirmation" element={<UserDeliveryConfirmation />} />
<Route path="/user/delivery-history" element={<DeliveryHistory />} />
<Route path="/user/download-receipt" element={<DownloadReceipt />} />
    {/* order flow(newly added) */}
<Route path="/place-order" element={<PlaceOrder />} />
<Route path="/track-shipment" element={<TrackShipment />} />
<Route path="/order-requests" element={<OrderRequests />} />
<Route path="/assign-order/:id" element={<AssignOrder />} />
<Route path="/my-orders" element={<MyOrders />} />
 <Route element={<ManagerLayout />}>
  <Route path="/manager" element={<ManagerDashboard />} />
  <Route path="/order-requests" element={<OrderRequests />} />
  <Route path="/assign-order/:id" element={<AssignOrder />} />
</Route>
<Route element={<UserLayout />}>
  <Route path="/user" element={<UserDashboard />} />
  <Route path="/place-order" element={<PlaceOrder />} />
  <Route path="/my-orders" element={<MyOrders />} />
  <Route path="/track-shipment/:id" element={<TrackShipment />} />
</Route>
    
    </Routes>
  );
}

export default App;