import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";

import ManagerDashboard from "./pages/ManagerDashboard";
import OrderRequests from "./pages/OrderRequests";
import AssignOrder from "./pages/AssignOrder";
import DriverManagement from "./pages/DriverManagement";
import VehicleManagement from "./pages/VehicleManagement";
import VehicleTracking from "./pages/VehicleTracking";
import NewOrder from "./pages/NewOrder";
import MyOrders from "./pages/MyOrders";

import DriverDashboard from "./pages/DriverDashboard";
import DriverNotifications from "./pages/DriverNotifications";
import MyDeliveries from "./pages/MyDeliveries";
import VehicleIssueReport from "./pages/VehicleIssueReport";
import RouteNavigation from "./pages/RouteNavigation";
import VehicleStatus from "./pages/VehicleStatus";
import NewOrderRequests from "./pages/NewOrderRequests";

import UserDashboard from "./pages/UserDashboard";
import UserNotifications from "./pages/UserNotifications";
import UserDeliveryConfirmation from "./pages/UserDeliveryConfirmation";
import DeliveryHistory from "./pages/DeliveryHistory";
import DownloadReceipt from "./pages/DownloadReceipt";
import PlaceOrder from "./pages/PlaceOrder";
import TrackShipment from "./pages/TrackShipment";

import DriverLayout from "./pages/DriverLayout";
import UserLayout from "./pages/UserLayout";
// import ManagerLayout from "./pages/ManagerLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/profile" element={<Profile />} />

      {/* <Route element={<ManagerLayout />}> */}
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/neworder" element={<NewOrder />} />
        <Route path="/order-requests" element={<OrderRequests />} />
        <Route path="/assign-order/ORD001" element={<AssignOrder />} />
        <Route path="/drivers" element={<DriverManagement />} />
        <Route path="/vehicles" element={<VehicleManagement />} />
        <Route path="/tracking" element={<VehicleTracking />} />
        <Route path="/orders" element={<MyOrders />} />
      {/* </Route> */}

      <Route element={<DriverLayout />}>
        <Route path="/driver" element={<DriverDashboard />} />
        <Route path="/driver/new-orders" element={<NewOrderRequests />} />
        <Route path="/driverdeliveries" element={<MyDeliveries />} />
        <Route path="/navigation" element={<RouteNavigation />} />
        <Route path="/vehiclestatus" element={<VehicleStatus />} />
        <Route path="/report-issue" element={<VehicleIssueReport />} />
        <Route path="/drivernotifications" element={<DriverNotifications />} />
      </Route>

      <Route element={<UserLayout />}>
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/track-shipment" element={<TrackShipment />} />
        <Route path="/track-shipment/:id" element={<TrackShipment />} />
        <Route path="/user/notifications" element={<UserNotifications />} />
        <Route path="/user/delivery-confirmation" element={<UserDeliveryConfirmation />} />
        <Route path="/user/delivery-history" element={<DeliveryHistory />} />
        <Route path="/user/download-receipt" element={<DownloadReceipt />} />
      </Route>
    </Routes>
  );
}

export default App;