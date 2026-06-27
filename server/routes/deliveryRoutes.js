const express = require("express");

const router = express.Router();

const {
  getCustomerDeliveries,
  getDriverDeliveries,
  confirmDelivery,
} = require("../controllers/deliveryController");

router.get("/customer/:customerId", getCustomerDeliveries);

router.get("/driver/:driverId", getDriverDeliveries);

router.put("/confirm/:id", confirmDelivery);

module.exports = router;