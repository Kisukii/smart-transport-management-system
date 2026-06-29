const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

const {
  createOrder,
  getOrders,
  getMyOrders,
  getOrderById,
  getDriverOrders,
} = require("../controllers/orderController");

// Create Order
router.post(
  "/",
  protect,
  authorize("user", "admin", "manager"),
  createOrder
);

// User Orders
router.get(
  "/my",
  protect,
  authorize("user", "admin", "manager"),
  getMyOrders
);

// Driver Orders
router.get(
  "/driver",
  protect,
  authorize("driver"),
  getDriverOrders
);

// All Orders
router.get(
  "/",
  protect,
  authorize("user", "manager", "driver"),
  getOrders
);

// Order By ID (KEEP THIS LAST)
router.get(
  "/:id",
  protect,
  authorize("user", "driver", "manager", "admin"),
  getOrderById
);

module.exports = router;