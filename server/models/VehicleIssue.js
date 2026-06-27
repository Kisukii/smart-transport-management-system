const mongoose = require("mongoose");

const vehicleIssueSchema = new mongoose.Schema(
  {
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      required: true,
    },

    vehicleNumber: {
      type: String,
      required: true,
    },

    issue: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Resolved"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("VehicleIssue", vehicleIssueSchema);