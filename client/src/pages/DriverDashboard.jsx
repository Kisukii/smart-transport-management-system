import { useState } from "react";
import { Link } from "react-router-dom";

const DriverDashboard = () => {
  const [deliveries] = useState([
    { id: 101, customer: "John", status: "Pending" },
    { id: 102, customer: "Anu", status: "Delivered" },
    { id: 103, customer: "Rahul", status: "In Transit" },
  ]);

  const delivered = deliveries.filter(
    (delivery) => delivery.status === "Delivered"
  ).length;

  const pending = deliveries.filter(
    (delivery) => delivery.status === "Pending"
  ).length;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Driver Dashboard</h1>

      <hr/>

      <h3>Quick Actions</h3>

      <Link to="/profile">
        <button>Profile</button>
      </Link>

      <br /><br />

      <Link to="/notifications">
        <button>Notifications</button>
      </Link>

      <br /><br />

      <Link to="/deliveries">
        <button>My Deliveries</button>
      </Link>

      <br /><br />

      <Link to="/report-issue">
        <button>Report Vehicle Issue</button>
      </Link>
      <br/><br/>
      <Link to="/navigation"><button>Route Navigation</button></Link>
      <br/><br/>
      
      <hr />

      <h3>Summary</h3>

      <p>Total Deliveries: {deliveries.length}</p>
      <p>Delivered: {delivered}</p>
      <p>Pending: {pending}</p>
<br/>
      <hr />
      
    </div>
  );
};

export default DriverDashboard;