import { useNavigate } from "react-router-dom";

const DriverLogin = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Driver Login</h1>

      <input
        type="text"
        placeholder="Driver ID"
        style={{ padding: "10px", margin: "10px" }}
      />

      <br />

      <input
        type="password"
        placeholder="Password"
        style={{ padding: "10px", margin: "10px" }}
      />

      <br />

      <button
        onClick={handleLogin}
        style={{ padding: "10px 20px" }}
      >
        Login
      </button>
    </div>
  );
};

export default DriverLogin;