const express = require("express");
const router = express.Router();

const {
  addVehicle,
  getVehicles,
  deleteVehicle,
} = require("../controllers/vehicleController");

router.post("/", addVehicle);
router.get("/", getVehicles);
router.delete("/:id", deleteVehicle);

module.exports = router;