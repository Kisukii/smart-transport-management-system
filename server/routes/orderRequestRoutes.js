const express = require("express");
const router = express.Router();

const {
  createOrderRequest,
  getAllRequests,
  getApprovedRequests,
  getMyRequests,
  assignOrder,
  approveOrderRequest,
  rejectOrderRequest,
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
// Manager/Admin view approved requests
router.get(
  "/approved",
  protect,
  authorize("manager", "admin"),
  getApprovedRequests
);

// Assign Driver + Vehicle
router.post(
  "/:id/assign",
  protect,
  authorize("manager", "admin"),
  assignOrder
);

// Approve order request
router.post(
  "/:id/approve",
  protect,
  authorize("manager", "admin"),
  approveOrderRequest
);

// Reject order request
router.post(
  "/:id/reject",
  protect,
  authorize("manager", "admin"),
  rejectOrderRequest
);

module.exports = router;