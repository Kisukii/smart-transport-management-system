const express = require("express");
const router = express.Router();



const { getDrivers } = require("../controllers/driverController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/", protect, authorize("admin", "manager"), getDrivers);


module.exports = router;