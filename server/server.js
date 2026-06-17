const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const { protect,authorize } = require("./middleware/authMiddleware");

dotenv.config();

connectDB();

const app = express();
const driverRoutes = require("./routes/driverRoutes");

app.use("/drivers", driverRoutes);
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.get("/",(req,res)=>{
    res.send("Server Running");
});
app.get("/api/profile", protect, (req, res) => {
  res.json({
    message: "Protected Route Accessed",
    user: req.user
  });
});

app.get(
  "/api/admin",
  protect,
  authorize("admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin"
    });
  }
);
// Admin Route
app.get(
  "/api/admin",
  protect,
  authorize("admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin"
    });
  }
);

// Manager Route
app.get(
  "/api/manager",
  protect,
  authorize("manager"),
  (req, res) => {
    res.json({
      message: "Welcome Manager"
    });
  }
);

// Driver Route
app.get(
  "/api/driver",
  protect,
  authorize("driver"),
  (req, res) => {
    res.json({
      message: "Welcome Driver"
    });
  }
);

// User Route
app.get(
  "/api/user",
  protect,
  authorize("user"),
  (req, res) => {
    res.json({
      message: "Welcome User"
    });
  }
);
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
});
