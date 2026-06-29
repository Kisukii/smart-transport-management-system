const mongoose = require("mongoose");

const generateVehicleId = () => {
  return `VEH-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`;
};

const vehicleSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: String,
      unique: true,
    },

    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
    },

    type: {
      type: String,
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Available", "Assigned", "Maintenance"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

vehicleSchema.pre("save", function () {
  if (!this.vehicleId) {
    this.vehicleId = generateVehicleId();
  }
});


module.exports = mongoose.model("Vehicle", vehicleSchema);