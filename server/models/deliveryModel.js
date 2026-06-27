const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      required: true,
    },

    pickupLocation: {
      type: String,
      required: true,
    },

    deliveryLocation: {
      type: String,
      required: true,
    },

    packageName: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "In Transit", "Delivered"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Delivery", deliverySchema);