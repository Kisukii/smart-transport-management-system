const mongoose = require("mongoose");

const generateOrderId = () => {
  return `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
};

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      index: true,
    },
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
      type: Date,
    },

    pickupTime: {
      type: String,
    },

    packageType: {
      type: String,
    },

    vehicleType: {
      type: String,
    },

    packageWeight: {
      type: Number,
    },

    paymentMethod: {
      type: String,
    },

    instructions: {
      type: String,
      default: "",
    },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      default: null,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Assigned",
        "Accepted",
        "Picked Up",
        "In Transit",
        "Delivered",
        "Rejected",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre("save", function () {
  if (!this.orderId) {
    this.orderId = generateOrderId();
  }
 
});

module.exports = mongoose.model("Order", orderSchema);