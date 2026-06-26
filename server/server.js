const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const driverRoutes = require("./routes/driverRoutes");
const orderRoutes = require("./routes/orderRoutes");

const connectDB = require("./config/db");
const { protect, authorize } = require("./middleware/authMiddleware");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

<<<<<<< HEAD
app.use("/api/driver", driverRoutes);
app.use("/api/auth",authRoutes);
=======
// ROUTES
app.use("/api/auth", authRoutes);
>>>>>>> 187043c6debb11e4e6e699418435996c203bf880
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Server Running");
});

// PROTECTED ROUTES
app.get("/api/profile", protect, (req, res) => {
  res.json({ message: "Protected Route Accessed", user: req.user });
});

app.get("/api/admin", protect, authorize("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

app.get("/api/manager", protect, authorize("manager"), (req, res) => {
  res.json({ message: "Welcome Manager" });
});

app.get("/api/driver", protect, authorize("driver"), (req, res) => {
  res.json({ message: "Welcome Driver" });
});

app.get("/api/user", protect, authorize("user"), (req, res) => {
  res.json({ message: "Welcome User" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});