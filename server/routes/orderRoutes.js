const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

const {
  createOrder,
  getOrders,
  getMyOrders,
  getOrderById,
  getDriverOrders,
  getMyDeliveries,
  acceptOrder,
  rejectOrder,
  updateOrderStatus,
  getDashboardData,
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

// Driver assigned orders
router.get(
  "/driver",
  protect,
  authorize("driver"),
  getDriverOrders
);

// Driver deliveries
router.get(
  "/driver/deliveries",
  protect,
  authorize("driver"),
  getMyDeliveries
);

// Accept order
router.put(
  "/:id/accept",
  protect,
  authorize("driver"),
  acceptOrder
);

// Reject order
router.put(
  "/:id/reject",
  protect,
  authorize("driver"),
  rejectOrder
);
router.get(
  "/dashboard",
  protect,
  authorize("user"),
  getDashboardData
);
// Update status
router.put(
  "/:id/status",
  protect,
  authorize("driver"),
  updateOrderStatus
);

// All orders
router.get(
  "/",
  protect,
  authorize("user", "manager", "driver", "admin"),
  getOrders
);

// Keep LAST
router.get(
  "/:id",
  protect,
  authorize("user", "driver", "manager", "admin"),
  getOrderById
);

module.exports = router;