import { useState, useEffect } from "react";

function VehicleManagement({ goBack }) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        setLoading(true);

        // We'll replace this with your backend later
        setVehicles([
          {
            id: 1,
            vehicleNumber: "KL07AB1234",
            type: "Bus",
            capacity: 50,
            status: "Available",
          },
          {
            id: 2,
            vehicleNumber: "KL08CD5678",
            type: "Van",
            capacity: 15,
            status: "On Trip",
          },
        ]);
      } catch (err) {
        setError("Failed to load vehicles");
      } finally {
        setLoading(false);
      }
    };

    loadVehicles();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Sales Pipeline</h1>

      <button
        onClick={goBack}
        className="mb-6 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-xl"
      >
        ← Back to Dashboard
      </button>

      <div className="mb-6">
        <button className="bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-xl">
          + Add Vehicle
        </button>
      </div>

      {loading ? (
        <p>Loading Vehicles...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : (
        <div className="bg-[#1e293b] rounded-2xl overflow-hidden">

          <table className="w-full">
            <thead>
              <tr className="bg-[#334155]">
                <th className="p-4 text-left">Vehicle Number</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Capacity</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {vehicles.map((vehicle) => (
                <tr
                  key={vehicle.id}
                  className="border-b border-slate-700"
                >
                  <td className="p-4">
                    {vehicle.vehicleNumber}
                  </td>

                  <td className="p-4">
                    {vehicle.type}
                  </td>

                  <td className="p-4">
                    {vehicle.capacity}
                  </td>

                  <td className="p-4">
                    {vehicle.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}
    </div>
  );
}

export default VehicleManagement;