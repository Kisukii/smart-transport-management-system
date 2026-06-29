const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const {
  createOrder,
  getOrders,
  getMyOrders,
  getOrderById,
} = require("../controllers/orderController");

router.post("/", protect, authorize("user", "admin", "manager"), createOrder);
router.get("/my", protect, authorize("user", "admin", "manager"), getMyOrders);
router.get("/:id", protect, authorize("user", "driver", "manager", "admin"), getOrderById);
router.get("/", protect, authorize("user", "manager", "driver"), getOrders);

module.exports = router;