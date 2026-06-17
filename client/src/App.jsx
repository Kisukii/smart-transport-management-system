import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NewOrder from "./pages/NewOrder";
import Tracking from "./pages/Tracking"
import DriverManagement from "./pages/DriverManagement";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/neworder" element={<NewOrder />} />
      <Route path="/tracking" element={<Tracking />} />
      <Route path="/drivers" element={<DriverManagement />} />
    </Routes>
  );
}

export default App;