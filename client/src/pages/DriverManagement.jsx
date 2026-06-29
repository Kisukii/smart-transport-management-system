import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DriverManagement({ goBack }) {
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/drivers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDrivers(res.data);
    } catch (err) {
        console.log(err);
        setError(err.response?.data?.message || err.message || "Failed to load drivers");
      }
    };
  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (driver.driverId || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">

      <button
        onClick={() => (goBack ? goBack() : navigate(-1))}
        className="mb-6 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-4xl font-bold mb-8">
        Driver Management
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">

        <div className="bg-[#1e293b] p-5 rounded-xl">
          <h2>Total Drivers</h2>
          <p className="text-3xl font-bold mt-2">
            {drivers.length}
          </p>
        </div>

        <div className="bg-[#1e293b] p-5 rounded-xl">
          <h2>Registered Drivers</h2>
          <p className="text-3xl font-bold mt-2 text-green-400">
            {drivers.length}
          </p>
        </div>

        <div className="bg-[#1e293b] p-5 rounded-xl">
          <h2>Today's Registrations</h2>
          <p className="text-3xl font-bold mt-2 text-cyan-400">
            {
              drivers.filter((driver) => {
                const today = new Date().toDateString();
                return (
                  new Date(driver.createdAt).toDateString() === today
                );
              }).length
            }
          </p>
        </div>

      </div>

      {/* Search */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Search Driver..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-700 rounded-lg px-4 py-2 w-80 outline-none"
          />
        </div>
        {error && (
          <p className="text-red-400">{error}</p>
        )}
      </div>

      {/* Table */}
      <div className="bg-[#1e293b] rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-700">

            <tr>
              <th className="p-4 text-left">Driver ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Registered On</th>
            </tr>

          </thead>

          <tbody>

            {filteredDrivers.length > 0 ? (

              filteredDrivers.map((driver) => (

                <tr
                  key={driver._id}
                  className="border-b border-slate-700 hover:bg-slate-800"
                >
                  <td className="p-4">
                    {driver.driverId || driver._id}
                  </td>

                  <td className="p-4">
                    {driver.name}
                  </td>

                  <td className="p-4">
                    {driver.email}
                  </td>

                  <td className="p-4 capitalize">
                    {driver.role}
                  </td>

                  <td className="p-4">
                    {new Date(driver.createdAt).toLocaleDateString()}
                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td
                  colSpan="5"
                  className="text-center py-8 text-gray-400"
                >
                  No Drivers Found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default DriverManagement;