import { useNavigate } from "react-router-dom";

const MyDeliveries = () => {
  const navigate = useNavigate();

  const deliveries = [
    { id: 101, customer: "John", status: "Pending" },
    { id: 102, customer: "Anu", status: "Delivered" },
    { id: 103, customer: "Rahul", status: "In Transit" },
  ];

  return (
    <div>
      <h1>My Deliveries</h1>

      {deliveries.map((d) => (
        <div key={d.id} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
          <p>Order ID: {d.id}</p>
          <p>Customer: {d.customer}</p>
          <p>Status: {d.status}</p>

          <button onClick={() => navigate("/confirmation")}>
            Open Delivery
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyDeliveries;