import { useEffect, useState } from "react";
import axios from "axios";

function DriverManagement({ goBack }) {
  const API = "http://localhost:5000/api/drivers";

  const [drivers, setDrivers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const [newDriver, setNewDriver] = useState({
    name: "",
    phone: "",
    license: "",
    status: "Available",
  });

  // ✅ LOAD DRIVERS
  const loadDrivers = async () => {
    try {
      const res = await axios.get(API);
      setDrivers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadDrivers();
  }, []);

  // ✅ VALIDATION
  const validateDriver = () => {
    if (!newDriver.name.trim()) return "Name is required";

    if (!/^[0-9]{10}$/.test(newDriver.phone)) {
      return "Phone must be exactly 10 digits";
    }

    if (!newDriver.license.trim()) return "License is required";

    return "";
  };

  // ✅ SAVE (ADD / UPDATE)
  const handleSave = async () => {
    const err = validateDriver();
    if (err) return setError(err);

    const payload = {
      name: newDriver.name,
      phone: newDriver.phone,
      licenseNumber: newDriver.license, // 🔥 IMPORTANT FIX
      status: newDriver.status,
    };

    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, payload);
      } else {
        await axios.post(API, payload);
      }

      setNewDriver({
        name: "",
        phone: "",
        license: "",
        status: "Available",
      });

      setEditId(null);
      setShowForm(false);
      setError("");
      loadDrivers();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      loadDrivers();
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ EDIT
  const handleEdit = (driver) => {
    setNewDriver({
      name: driver.name,
      phone: driver.phone,
      license: driver.licenseNumber || driver.license,
      status: driver.status,
    });

    setEditId(driver._id || driver.id);
    setShowForm(true);
    setError("");
  };

  // ✅ STATS
  const totalDrivers = drivers.length;
  const availableDrivers = drivers.filter(d => d.status === "Available").length;
  const busyDrivers = drivers.filter(d => d.status === "Busy").length;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">

      {/* BACK */}
      <button
        onClick={goBack}
        className="mb-6 bg-slate-700 px-4 py-2 rounded-lg"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-4xl font-bold mb-8">Driver Management</h1>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-6 mb-8">

        <div className="bg-[#1e293b] p-5 rounded-xl">
          <h2>Total</h2>
          <p className="text-3xl">{totalDrivers}</p>
        </div>

        <div className="bg-[#1e293b] p-5 rounded-xl">
          <h2>Available</h2>
          <p className="text-3xl text-green-400">{availableDrivers}</p>
        </div>

        <div className="bg-[#1e293b] p-5 rounded-xl">
          <h2>Busy</h2>
          <p className="text-3xl text-yellow-400">{busyDrivers}</p>
        </div>

      </div>

      {/* SEARCH + ADD */}
      <div className="flex justify-between mb-6">

        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search driver"
          className="bg-slate-700 px-4 py-2 rounded-lg w-72"
        />

        <button
          onClick={() => {
            setShowForm(true);
            setEditId(null);
            setNewDriver({
              name: "",
              phone: "",
              license: "",
              status: "Available",
            });
          }}
          className="bg-cyan-500 px-5 py-2 rounded-lg"
        >
          + Add Driver
        </button>

      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-[#1e293b] p-6 rounded-xl mb-6">

          <h2 className="text-2xl mb-4">
            {editId ? "Edit Driver" : "Add Driver"}
          </h2>

          {error && (
            <p className="text-red-400 mb-3">{error}</p>
          )}

          <input
            placeholder="Name"
            value={newDriver.name}
            onChange={(e) =>
              setNewDriver({ ...newDriver, name: e.target.value })
            }
            className="w-full p-2 mb-3 bg-slate-700 rounded"
          />

          <input
            placeholder="Phone"
            value={newDriver.phone}
            onChange={(e) =>
              setNewDriver({ ...newDriver, phone: e.target.value })
            }
            className="w-full p-2 mb-3 bg-slate-700 rounded"
          />

          <input
            placeholder="License"
            value={newDriver.license}
            onChange={(e) =>
              setNewDriver({ ...newDriver, license: e.target.value })
            }
            className="w-full p-2 mb-3 bg-slate-700 rounded"
          />

          <select
            value={newDriver.status}
            onChange={(e) =>
              setNewDriver({ ...newDriver, status: e.target.value })
            }
            className="w-full p-2 mb-4 bg-slate-700 rounded"
          >
            <option>Available</option>
            <option>Busy</option>
            <option>On Leave</option>
          </select>

          <div className="flex gap-3">

            <button
              onClick={handleSave}
              className="bg-green-500 px-4 py-2 rounded"
            >
              Save
            </button>

            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-500 px-4 py-2 rounded"
            >
              Cancel
            </button>

          </div>

        </div>
      )}

      {/* TABLE */}
      <div className="bg-[#1e293b] rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-700">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">License</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {drivers
              .filter(d =>
                d.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(driver => (
                <tr key={driver._id || driver.id}>

                  <td className="p-4">{driver.name}</td>
                  <td className="p-4">{driver.phone}</td>
                  <td className="p-4">{driver.licenseNumber || driver.license}</td>
                  <td className="p-4">{driver.status}</td>

                  <td className="p-4">

                    <button
                      onClick={() => handleEdit(driver)}
                      className="bg-green-500 px-3 py-1 mr-2 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(driver._id || driver.id)}
                      className="bg-red-500 px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default DriverManagement;