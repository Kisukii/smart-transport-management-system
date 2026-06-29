import { useEffect, useState } from "react";
import axios from "axios";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/orderrequests/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRequests(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">My Requests</h1>

      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        requests.map((req) => (
          <div
            key={req._id}
            className="bg-slate-900 rounded-xl p-5 mb-5"
          >
            <p><b>Pickup:</b> {req.pickupLocation}</p>
            <p><b>Drop:</b> {req.dropLocation}</p>
            <p><b>Status:</b> {req.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyRequests;
