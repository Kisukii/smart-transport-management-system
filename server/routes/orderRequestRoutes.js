const express = require("express");
const router = express.Router();

const {
  createOrderRequest,
  getAllRequests,
  getMyRequests,
  assignOrder,
} = require("../controllers/orderRequestController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// Customer creates request
router.post(
  "/",
  protect,
  authorize("user", "manager", "admin"),
  createOrderRequest
);

// Customer views own requests
router.get(
  "/my",
  protect,
  authorize("user", "manager", "admin"),
  getMyRequests
);

// Manager/Admin view pending requests
router.get(
  "/",
  protect,
  authorize("manager", "admin"),
  getAllRequests
);

// Assign Driver + Vehicle
router.post(
  "/:id/assign",
  protect,
  authorize("manager", "admin"),
  assignOrder
);

module.exports = router;