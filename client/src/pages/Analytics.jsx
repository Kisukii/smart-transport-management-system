function Analytics({ goBack }) {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">
      <h1 className="text-4xl font-bold mb-4">Analytics</h1>

      <button
        onClick={goBack}
        className="mb-6 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-xl"
      >
        ← Back to Dashboard
      </button>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-[#1e293b] p-6 rounded-2xl">
          <h2 className="text-lg">Monthly Revenue</h2>
          <p className="text-3xl font-bold mt-3">₹4.2L</p>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-2xl">
          <h2 className="text-lg">Lead Conversion Rate</h2>
          <p className="text-3xl font-bold mt-3">32%</p>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-2xl">
          <h2 className="text-lg">Active Clients</h2>
          <p className="text-3xl font-bold mt-3">48</p>
        </div>

      </div>
    </div>
  );
}

export default Analytics;