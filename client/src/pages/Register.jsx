import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="h-screen flex items-center justify-center bg-[#0f172a] text-white">
      <div className="bg-[#1e293b] p-10 rounded-2xl w-400">
        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 rounded-xl bg-[#334155] mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-xl bg-[#334155] mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-xl bg-[#334155] mb-4"
        />

        <button className="w-full bg-cyan-500 p-3 rounded-xl">
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