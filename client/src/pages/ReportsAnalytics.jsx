import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ReportsAnalytics({ goBack }) {
  const shipmentData = [
    { day: "Mon", shipments: 12 },
    { day: "Tue", shipments: 18 },
    { day: "Wed", shipments: 15 },
    { day: "Thu", shipments: 22 },
    { day: "Fri", shipments: 19 },
    { day: "Sat", shipments: 25 },
    { day: "Sun", shipments: 16 },
  ];

  const driverData = [
    { name: "Available", value: 18 },
    { name: "Busy", value: 10 },
    { name: "On Leave", value: 4 },
  ];

  const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">

      {/* Back Button */}
      <button
        onClick={goBack}
        className="mb-6 bg-slate-700 hover:bg-slate-600 px-5 py-2 rounded-lg"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-4xl font-bold mb-8">
         Reports & Analytics
      </h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <div className="bg-[#1e293b] rounded-xl p-6 shadow-lg">
          <h2 className="text-gray-400">Total Shipments</h2>
          <p className="text-4xl font-bold mt-3">128</p>
        </div>

        <div className="bg-[#1e293b] rounded-xl p-6 shadow-lg">
          <h2 className="text-gray-400">Completed Deliveries</h2>
          <p className="text-4xl font-bold mt-3 text-green-400">98</p>
        </div>

        <div className="bg-[#1e293b] rounded-xl p-6 shadow-lg">
          <h2 className="text-gray-400">Active Vehicles</h2>
          <p className="text-4xl font-bold mt-3 text-cyan-400">42</p>
        </div>

        <div className="bg-[#1e293b] rounded-xl p-6 shadow-lg">
          <h2 className="text-gray-400">Pending Orders</h2>
          <p className="text-4xl font-bold mt-3 text-yellow-400">7</p>
        </div>

      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8 mb-10">

        {/* Bar Chart */}
        <div className="bg-[#1e293b] p-6 rounded-xl">

          <h2 className="text-2xl font-semibold mb-5">
            Weekly Shipments
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={shipmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Bar dataKey="shipments" fill="#06b6d4" />
            </BarChart>
          </ResponsiveContainer>

        </div>

        {/* Pie Chart */}
        <div className="bg-[#1e293b] p-6 rounded-xl">

          <h2 className="text-2xl font-semibold mb-5">
            Driver Status
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={driverData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {driverData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* Recent Reports */}
      <div className="bg-[#1e293b] rounded-xl p-6 mb-10">

        <h2 className="text-2xl font-semibold mb-5">
          Recent Reports
        </h2>

        <table className="w-full">

          <thead>
            <tr className="text-left border-b border-gray-600">
              <th className="py-3">Report</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            <tr className="border-b border-gray-700">
              <td className="py-4">Weekly Shipment Report</td>
              <td>26 Jun 2026</td>
              <td className="text-green-400">Ready</td>
            </tr>

            <tr className="border-b border-gray-700">
              <td className="py-4">Monthly Vehicle Report</td>
              <td>25 Jun 2026</td>
              <td className="text-green-400">Ready</td>
            </tr>

            <tr>
              <td className="py-4">Driver Performance Report</td>
              <td>24 Jun 2026</td>
              <td className="text-yellow-400">Processing</td>
            </tr>

          </tbody>

        </table>

      </div>

      {/* Export Buttons */}
      <div className="flex gap-4">

        <button className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-lg">
          📄 Export PDF
        </button>

        <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg">
          📊 Export Excel
        </button>

        <button className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-lg text-black font-semibold">
          📥 Download CSV
        </button>

      </div>

    </div>
  );
}

export default ReportsAnalytics;