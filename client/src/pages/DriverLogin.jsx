import { useNavigate } from "react-router-dom";

const DriverLogin = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("driverToken", "sample-driver-token");
    navigate("/driverdashboard");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
      <div className="w-420px bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2"> Driver Login</h1>
        <p className="text-slate-400 text-center mb-8">
          Smart Transport Management System
        </p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Driver Email"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition py-3 rounded-xl font-semibold"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverLogin;