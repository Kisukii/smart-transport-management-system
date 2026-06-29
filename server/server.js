const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const driverRoutes = require("./routes/driverRoutes");
const orderRoutes = require("./routes/orderRoutes");
const customerRoutes = require("./routes/customerRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const orderRequestRoutes = require("./routes/orderRequestRoutes");
const connectDB = require("./config/db");
const { protect, authorize } = require("./middleware/authMiddleware");
const profileRoutes = require("./routes/profileRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/profile", profileRoutes);
app.use("/api/orderrequests", orderRequestRoutes);
app.use("/api/user", customerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/orders", require("./routes/orderRoutes"));
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
  res.json({ message: "Welcome Customer" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});