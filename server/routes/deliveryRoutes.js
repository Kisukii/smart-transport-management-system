const express = require("express");

const {
  createDelivery,
  getAllDeliveries,
  getCustomerDeliveries,
  getDriverDeliveries,
  updateDeliveryStatus,
  confirmDelivery,
  trackShipment,
  downloadReceipt,
} = require("../controllers/deliveryController");

const router = express.Router();

router.post("/", createDelivery);

router.get("/", getAllDeliveries);

router.get("/customer/:customerId", getCustomerDeliveries);

router.get("/driver/:driverId", getDriverDeliveries);

router.put("/status/:id", updateDeliveryStatus);

router.put("/confirm/:id", confirmDelivery);

router.get("/track/:id", trackShipment);

router.get("/receipt/:id", downloadReceipt);

module.exports = router;