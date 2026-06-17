const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const { protect } = require("./middleware/authMiddleware");

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


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
});
