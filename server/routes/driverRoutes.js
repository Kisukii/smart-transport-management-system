const express = require("express");

const router = express.Router();

const {
  registerDriver,
  loginDriver,
  getDriverProfile,
  updateDriverProfile,
  getDriverDeliveries,
  confirmDelivery,
  reportVehicleIssue,
  getDriverNotifications,
} = require("../controllers/driverController");


// test route
router.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Rahul",
      phone: "9876543210",
      licenseNumber: "KL07AB1234",
      status: "Available",
    },
  ]);
});

// driver registration
router.post("/register", registerDriver);

// driver login
router.post("/login", loginDriver);

router.get("/profile/:id", getDriverProfile);

// Update driver profile
router.put("/profile/:id", updateDriverProfile);

// Get assigned deliveries
router.get("/:id/deliveries", getDriverDeliveries);

// Confirm delivery
router.put("/deliveries/:deliveryId/confirm", confirmDelivery);

// Report vehicle issue
router.post("/:id/report-issue", reportVehicleIssue);

// Get notifications
router.get("/:id/notifications", getDriverNotifications);

module.exports = router;