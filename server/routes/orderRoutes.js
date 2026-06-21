const express = require("express");
const router = express.Router();

// TEMP DATABASE (replace later with MongoDB model)
let orders = [];

// GET ALL ORDERS
router.get("/", (req, res) => {
  res.json(orders);
});

// POST NEW ORDER ⭐ (THIS FIXES YOUR ERROR)
router.post("/", (req, res) => {
  const newOrder = {
    id: Date.now(),
    ...req.body,
  };

  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// UPDATE ORDER
router.put("/:id", (req, res) => {
  orders = orders.map((o) =>
    o.id == req.params.id ? { ...o, ...req.body } : o
  );
  res.json({ message: "Updated" });
});

// DELETE ORDER
router.delete("/:id", (req, res) => {
  orders = orders.filter((o) => o.id != req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;