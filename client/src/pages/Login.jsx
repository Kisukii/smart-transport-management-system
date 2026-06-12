import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Register from "./Register";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("name", data.name);

        switch (data.role) {
          case "admin":
            navigate("/admin");
            break;

          case "transport_manager":
            navigate("/manager");
            break;

          case "driver":
            navigate("/driver");
            break;

          case "user":
            navigate("/user");
            break;

          default:
            navigate("/");
        }
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#0f172a] text-white">
      <div className="bg-[#1e293b] p-10 rounded-2xl w-400 shadow-2xl">

        <h1 className="text-3xl font-bold mb-8 text-center">
          Vehicle Management System
        </h1>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl bg-[#334155] outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-[#334155] outline-none"
          />

          {error && (
            <p className="text-red-400 text-sm">
              {error}
            </p>
          )}

          <button
            onClick={handleLogin}
            className="w-full bg-cyan-500 hover:bg-cyan-600 p-3 rounded-xl transition"
          >
            Login
          </button>

          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?
            </p>

            <Link
              to="/register"
              className="text-cyan-400 hover:text-cyan-300 font-medium"
            >
              Register Here
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;

