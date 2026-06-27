const express = require("express");
const router = express.Router();

let drivers = [
  {
    id: 1,
    name: "Rahul",
    phone: "9876543210",
    licenseNumber: "KL07AB1234",
    status: "Available",
  },
];

// GET ALL DRIVERS
router.get("/", (req, res) => {
  res.json(drivers);
});

// POST DRIVER ⭐ FIX FOR YOUR ERROR
router.post("/", (req, res) => {
  const newDriver = {
    id: Date.now(),
    ...req.body,
  };

  drivers.push(newDriver);
  res.status(201).json(newDriver);
});

// UPDATE DRIVER
router.put("/:id", (req, res) => {
  drivers = drivers.map((d) =>
    d.id == req.params.id ? { ...d, ...req.body } : d
  );

  res.json({ message: "Updated", drivers });
});

// DELETE DRIVER
router.delete("/:id", (req, res) => {
  drivers = drivers.filter((d) => d.id != req.params.id);
  res.json({ message: "Deleted", drivers });
});

module.exports = router;