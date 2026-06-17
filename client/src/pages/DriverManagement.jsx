function DriverManagement({ goBack }) {
  const drivers = [
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
  ];

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
          className="bg-slate-700 rounded-lg px-4 py-2 w-72 outline-none"
        />

        <button className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg">
          + Add Driver
        </button>

      </div>

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

            {drivers.map((driver) => (

              <tr key={driver.id} className="border-b border-slate-700">

                <td className="p-4">{driver.name}</td>

                <td className="p-4">{driver.phone}</td>

                <td className="p-4">{driver.license}</td>

                <td className="p-4">{driver.status}</td>

                <td className="p-4 text-center">

                  <button className="bg-green-500 px-3 py-1 rounded mr-2 hover:bg-green-600">
                    Edit
                  </button>

                  <button className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
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