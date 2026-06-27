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


// driver-specific fields
assignedVehicle: {
  type: String,
  default: "",
},

vehicleNumber: {
  type: String,
  required: true,
},

email: {
  type: String,
  required: true,
  unique: true,
},

password: { type: String, required: true, },

vehicleStatus: {
  type: String,
  enum: [
    "Available",
    "On Delivery",
    "Under Maintenance",
    "Break",
    "Offline",
  ],
  default: "Available",
},

profileImage: {
  type: String,
  default: "",
},
});

module.exports = mongoose.model("Driver", driverSchema);