import { useState, useEffect } from "react";
function Leads({ goBack }) {
  const [leads, setLeads] = useState([]);
  useEffect(() => {
  fetch("https://leadforge-x8t8.onrender.com/leads")
    .then((res) => res.json())
     .then((data) => {
      console.log("API DATA:", data); // 👈 important
      setLeads(data);
    })
    .catch((err) => console.error(err));
}, []);
const moveLeadForward = (index) => {
  const stages = ["New", "Contacted", "Proposal", "Closed"];

  const updatedLeads = [...leads];

  const currentStage = updatedLeads[index].status;
  const currentIndex = stages.indexOf(currentStage);

  if (currentIndex < stages.length - 1) {
    updatedLeads[index].status = stages[currentIndex + 1];
    setLeads(updatedLeads);
  }
};
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Leads</h1>

      <button
        onClick={goBack}
        className="mb-6 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-xl"
      >
        ← Back to Dashboard
      </button>

      <div className="bg-[#1e293b] rounded-2xl p-6">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-slate-600">
              <th className="pb-4">Company</th>
              <th>Status</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead, index) => (
              <tr key={index} className="border-b border-slate-700">
                <td className="py-4">
  <div className="font-semibold">{lead.company}</div>

  <ul className="text-sm text-slate-400 mt-1">
    {lead.tasks?.map((task, i) => (
      <li key={i}>• {task}</li>
    ))}
  </ul>
</td>
                <td>{lead.status}</td>
                <td>{lead.email}</td>
                <td>
  <button
    onClick={() => moveLeadForward(index)}
    className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded-lg"
  >
    Move →
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

export default Leads;