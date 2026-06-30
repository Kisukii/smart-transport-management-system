const express = require("express");
const router = express.Router();

const {
  getDrivers,
  getDriverProfile,
  updateDriverStatus,
} = require("../controllers/driverController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// Manager/Admin - Get all drivers
router.get(
  "/",
  protect,
  authorize("manager", "admin"),
  getDrivers
);

// Driver - Profile
router.get(
  "/profile",
  protect,
  authorize("driver"),
  getDriverProfile
);

// Driver - Update status
router.put(
  "/status",
  protect,
  authorize("driver"),
  updateDriverStatus
);

module.exports = router;