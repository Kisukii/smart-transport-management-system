import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CustomerManagement() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/customers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCustomers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">

      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-4xl font-bold mb-8">
        Customer Management
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">

        <div className="bg-[#1e293b] p-5 rounded-xl">
          <h2>Total Customers</h2>
          <p className="text-3xl font-bold mt-2">
            {customers.length}
          </p>
        </div>

        <div className="bg-[#1e293b] p-5 rounded-xl">
          <h2>Registered Customers</h2>
          <p className="text-3xl font-bold mt-2 text-green-400">
            {customers.length}
          </p>
        </div>

        <div className="bg-[#1e293b] p-5 rounded-xl">
          <h2>Today's Registrations</h2>
          <p className="text-3xl font-bold mt-2 text-cyan-400">
            {
              customers.filter((customer) => {
                const today = new Date().toDateString();
                return (
                  new Date(customer.createdAt).toDateString() === today
                );
              }).length
            }
          </p>
        </div>

      </div>

      {/* Search */}
      <div className="flex justify-between mb-6">

        <input
          type="text"
          placeholder="Search Customer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-slate-700 rounded-lg px-4 py-2 w-80 outline-none"
        />

      </div>

      {/* Table */}
      <div className="bg-[#1e293b] rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-700">

            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Registered On</th>
            </tr>

          </thead>

          <tbody>

            {filteredCustomers.length > 0 ? (

              filteredCustomers.map((customer) => (

                <tr
                  key={customer._id}
                  className="border-b border-slate-700 hover:bg-slate-800"
                >
                  <td className="p-4">
                    {customer.name}
                  </td>

                  <td className="p-4">
                    {customer.email}
                  </td>

                  <td className="p-4 capitalize">
                    {customer.role}
                  </td>

                  <td className="p-4">
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td
                  colSpan="4"
                  className="text-center py-8 text-gray-400"
                >
                  No Customers Found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default CustomerManagement;