import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      setError("");

      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
          role,
        }
      );

      alert("Registration Successful");
      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#0f172a] text-white">
      <div className="bg-[#1e293b] p-10 rounded-2xl w-450px">

        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-xl bg-[#334155] mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-xl bg-[#334155] mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-xl bg-[#334155] mb-4"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 rounded-xl bg-[#334155] mb-4"
        >
          <option value="customer">customer</option>
          <option value="driver">Driver</option>
          <option value="manager">Manager</option>
       
        </select>

        {error && (
          <p className="text-red-400 mb-4">
            {error}
          </p>
        )}

        <button
          onClick={handleRegister}
          className="w-full bg-cyan-500 p-3 rounded-xl"
        >
          Register
        </button>

        <div className="mt-4 text-center">
          <Link
            to="/"
            className="inline-block w-full bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-xl transition"
          >
            Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Register;