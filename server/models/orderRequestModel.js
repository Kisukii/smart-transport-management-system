const mongoose = require("mongoose");

const orderRequestSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    customerName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    pickupLocation: {
      type: String,
      required: true,
    },

    dropLocation: {
      type: String,
      required: true,
    },

    pickupDate: {
      type: String,
    },

    pickupTime: {
      type: String,
    },

    packageType: {
      type: String,
      required: true,
    },

    vehicleType: {
      type: String,
    },

    packageWeight: {
      type: String,
    },

    paymentMethod: {
      type: String,
      required: true,
    },

    instructions: {
      type: String,
    },

    status: {
      type: String,
       enum: ["Pending", "Approved", "Rejected", "Assigned"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("OrderRequest", orderRequestSchema);