import { useState } from "react";

function DriverManagement({ goBack }) {
   const [drivers, setDrivers] = useState([
    {
      id: 1,
      name: "Rahul",
      phone: "9876543210",
      license: "KL07AB1234",
      status: "Available",
    },
    {
      id: 2,
      name: "Anjali",
      phone: "9123456780",
      license: "KL08CD5678",
      status: "Busy",
    },
    {
      id: 3,
      name: "Arjun",
      phone: "9988776655",
      license: "KL13EF9012",
      status: "On Leave",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [newDriver, setNewDriver] = useState({
    name: "",
    phone: "",
    license: "",
    status: "Available",
  });


  const [searchTerm, setSearchTerm] = useState("");

  const [editId, setEditId] = useState(null);
  //to delete driver
  const handleDelete = (id) => {
  const filtered = drivers.filter((d) => d.id !== id);
  setDrivers(filtered);
};

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">

      <button
        onClick={goBack}
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
          <p className="text-3xl font-bold mt-2">3</p>
        </div>

        <div className="bg-[#1e293b] p-5 rounded-xl">
          <h2>Available</h2>
          <p className="text-3xl font-bold mt-2 text-green-400">1</p>
        </div>

        <div className="bg-[#1e293b] p-5 rounded-xl">
          <h2>Busy</h2>
          <p className="text-3xl font-bold mt-2 text-yellow-400">1</p>
        </div>

      </div>

      {/* Search + Button */}
      <div className="flex justify-between mb-6">

        <input
          type="text"
          placeholder="Search Driver..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-slate-700 rounded-lg px-4 py-2 w-72 outline-none"
        />

        <button
          onClick={() => setShowForm(true)}
          className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg"
        >
         + Add Driver
        </button>

      </div>

      {/* ADD DRIVER FORM */}
    {showForm && (
      <div className="bg-[#1e293b] p-6 rounded-xl mb-6">

      <h2 className="text-2xl font-bold mb-4">
      Add New Driver
     </h2>

    <input
      type="text"
      placeholder="Driver Name"
      value={newDriver.name}
      onChange={(e) =>
        setNewDriver({ ...newDriver, name: e.target.value })
      }
      className="w-full p-2 mb-3 rounded bg-slate-700"
    />

    <input
      type="text"
      placeholder="Phone Number"
      value={newDriver.phone}
      onChange={(e) =>
        setNewDriver({ ...newDriver, phone: e.target.value })
      }
      className="w-full p-2 mb-3 rounded bg-slate-700"
    />

    <input
      type="text"
      placeholder="License Number"
      value={newDriver.license}
      onChange={(e) =>
        setNewDriver({ ...newDriver, license: e.target.value })
      }
      className="w-full p-2 mb-3 rounded bg-slate-700"
    />

    <select
      value={newDriver.status}
      onChange={(e) =>
        setNewDriver({ ...newDriver, status: e.target.value })
      }
      className="w-full p-2 mb-4 rounded bg-slate-700"
    >
      <option>Available</option>
      <option>Busy</option>
      <option>On Leave</option>
    </select>

    <div className="flex gap-3">

            <button
              onClick={() => {
                if (editId !== null) {
                  // UPDATE DRIVER
                  const updated = drivers.map((d) =>
                    d.id === editId ? { ...newDriver, id: editId } : d
                  );
                  setDrivers(updated);
                  setEditId(null);
                } else {
                  // ADD DRIVER
                  setDrivers([
                    ...drivers,
                    {
                      id: drivers.length + 1,
                      ...newDriver,
                    },
                  ]);
                }

                setNewDriver({
                  name: "",
                  phone: "",
                  license: "",
                  status: "Available",
                });

                setShowForm(false);
              }}
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
            >
              Save Driver
            </button>


      <button
        onClick={() => setShowForm(false)}
        className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600"
      >
        Cancel
      </button>

    </div>

  </div>
)}

      {/* Driver Table */}
      <div className="bg-[#1e293b] rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-700">

            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">License</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>

          </thead>

          <tbody>

            {drivers
              .filter((driver) =>
              driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              driver.phone.includes(searchTerm) ||
              driver.license.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((driver) => (

              <tr key={driver.id} className="border-b border-slate-700">

                <td className="p-4">{driver.name}</td>

                <td className="p-4">{driver.phone}</td>

                <td className="p-4">{driver.license}</td>

                <td className="p-4">{driver.status}</td>

                <td className="p-4 text-center">

                  <button
                     onClick={() => {
                    setNewDriver(driver);
                    setEditId(driver.id);
                    setShowForm(true);
                     }}
                     className="bg-green-500 px-3 py-1 rounded mr-2 hover:bg-green-600"
                  >
                    Edit
                  </button>

                 <button
                    onClick={() => handleDelete(driver.id)}
                    className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
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