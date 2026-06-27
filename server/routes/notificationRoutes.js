const express = require("express");

const {
  createNotification,
  getUserNotifications,
  markAsRead,
} = require("../controllers/notificationController");

const router = express.Router();

router.post("/", createNotification);

router.get("/:userId", getUserNotifications);

router.put("/read/:id", markAsRead);

module.exports = router;