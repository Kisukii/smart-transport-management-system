const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  licenseNumber: {
    type: String,
    required: true,
    unique: true,
  },

  status: {
    type: String,
    enum: ["Available", "Busy", "On Leave"],
    default: "Available",
  },
});

module.exports = mongoose.model("Driver", driverSchema);