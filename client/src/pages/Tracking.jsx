function Tracking({ goBack }) {
  const vehicles = [
    {
      vehicleNo: "KL10AB1234",
      route: "Kozhikode → Malappuram",
      location: "Ramanattukara",
      status: "In Transit",
      eta: "10:30 AM",
    },
    {
      vehicleNo: "KL55CD5678",
      route: "Calicut → Tirur",
      location: "Kottakkal",
      status: "Running",
      eta: "11:15 AM",
    },
    {
      vehicleNo: "KL07EF9012",
      route: "Thrissur → Kochi",
      location: "Edappally",
      status: "Arrived",
      eta: "Completed",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        Vehicle Tracking
      </h1>

      <button
        onClick={goBack}
        className="mb-6 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-xl"
      >
        ← Back to Dashboard
      </button>

      <div className="grid grid-cols-3 gap-6">
        {vehicles.map((vehicle, index) => (
          <div
            key={index}
            className="bg-[#1e293b] p-6 rounded-2xl hover:scale-105 transition"
          >
            <h2 className="text-xl font-bold mb-4">
              {vehicle.vehicleNo}
            </h2>

            <p className="mb-2">
              <strong>Route:</strong> {vehicle.route}
            </p>

            <p className="mb-2">
              <strong>Current Location:</strong>{" "}
              {vehicle.location}
            </p>

            <p className="mb-2">
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded ${
                  vehicle.status === "Arrived"
                    ? "bg-green-600"
                    : vehicle.status === "Running"
                    ? "bg-blue-600"
                    : "bg-yellow-600"
                }`}
              >
                {vehicle.status}
              </span>
            </p>

            <p>
              <strong>ETA:</strong> {vehicle.eta}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tracking;