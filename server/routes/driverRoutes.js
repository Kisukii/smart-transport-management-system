const express = require("express");

const router = express.Router();

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

module.exports = router;