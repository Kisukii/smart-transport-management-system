import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("userToken", "demo-token");
    navigate("/user/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white w-96 p-8 rounded-2xl shadow">
        <h1 className="text-2xl font-bold text-center mb-6">User Login</h1>

        <input
          className="w-full border p-3 rounded-lg mb-4"
          placeholder="Email"
        />

        <input
          className="w-full border p-3 rounded-lg mb-4"
          type="password"
          placeholder="Password"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default UserLogin;