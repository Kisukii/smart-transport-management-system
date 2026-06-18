import { useState, useEffect } from "react";

function VehicleManagement({ goBack }) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [vehicleNumber, setVehicleNumber] = useState("");
  const [type, setType] = useState("");
  const [capacity, setCapacity] = useState("");

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/vehicles"
      );

      const data = await res.json();

      setVehicles(data);
    } catch (err) {
      setError("Failed to load vehicles");
    } finally {
      setLoading(false);
    }
  };

  const handleAddVehicle = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/vehicles",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vehicleNumber,
            type,
            capacity,
            status: "Available",
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setVehicles([...vehicles, data.vehicle]);

      setVehicleNumber("");
      setType("");
      setCapacity("");

      setShowForm(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(
        `http://localhost:5000/api/vehicles/${id}`,
        {
          method: "DELETE",
        }
      );

      setVehicles(
        vehicles.filter(
          (vehicle) => vehicle._id !== id
        )
      );
    } catch (err) {
      alert("Failed to delete vehicle");
    }
  };

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.vehicleNumber
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        Vehicle Management
      </h1>

      <button
        onClick={goBack}
        className="mb-6 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-xl"
      >
        ← Back to Dashboard
      </button>

      <div className="flex gap-4 mb-6">

        <input
          type="text"
          placeholder="Search Vehicle"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="flex-1 p-3 rounded-xl bg-[#334155]"
        />

        <button
          onClick={() =>
            setVehicles(
              [...vehicles].sort((a, b) =>
                a.vehicleNumber.localeCompare(
                  b.vehicleNumber
                )
              )
            )
          }
          className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-xl"
        >
          Sort A-Z
        </button>

        <button
          onClick={() =>
            setVehicles(
              [...vehicles].sort(
                (a, b) =>
                  new Date(b.createdAt) -
                  new Date(a.createdAt)
              )
            )
          }
          className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-xl"
        >
          Sort Date
        </button>

        <button
          onClick={() => setShowForm(true)}
          className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-xl"
        >
          Add Vehicle
        </button>

      </div>

      {showForm && (
        <div className="bg-[#1e293b] p-6 rounded-2xl mb-6">

          <h2 className="text-2xl font-bold mb-4">
            Add Vehicle
          </h2>

          <input
            type="text"
            placeholder="Vehicle Number"
            value={vehicleNumber}
            onChange={(e) =>
              setVehicleNumber(e.target.value)
            }
            className="w-full p-3 bg-[#334155] rounded-xl mb-3"
          />

          <input
            type="text"
            placeholder="Vehicle Type"
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
            className="w-full p-3 bg-[#334155] rounded-xl mb-3"
          />

          <input
            type="number"
            placeholder="Capacity"
            value={capacity}
            onChange={(e) =>
              setCapacity(e.target.value)
            }
            className="w-full p-3 bg-[#334155] rounded-xl mb-3"
          />

          <button
            onClick={handleAddVehicle}
            className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-xl mr-3"
          >
            Save Vehicle
          </button>

          <button
            onClick={() => setShowForm(false)}
            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl"
          >
            Cancel
          </button>

        </div>
      )}

      {loading ? (
        <p>Loading Vehicles...</p>
      ) : error ? (
        <p className="text-red-400">
          {error}
        </p>
      ) : (
        <div className="bg-[#1e293b] rounded-2xl overflow-hidden">

          <table className="w-full">

            <thead>
              <tr className="bg-[#334155]">
                <th className="p-4 text-left">
                  Vehicle Number
                </th>
                <th className="p-4 text-left">
                  Type
                </th>
                <th className="p-4 text-left">
                  Capacity
                </th>
                <th className="p-4 text-left">
                  Status
                </th>
                <th className="p-4 text-left">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredVehicles.map(
                (vehicle) => (
                  <tr
                    key={vehicle._id}
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

                    <td className="p-4">

                      <button
                        className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded mr-2"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            vehicle._id
                          )
                        }
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                      >
                        Delete
                      </button>

                    </td>
                  </tr>
                )
              )}
            </tbody>

          </table>

        </div>
      )}
    </div>
  );
}

export default VehicleManagement;