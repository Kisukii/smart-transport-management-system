const Order = require("../models/orderModel");
const User = require("../models/User");
const Vehicle = require("../models/vehicle");
// Customer places an order
const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      pickupLocation,
      dropLocation,
      pickupDate,
      pickupTime,
      packageType,
      vehicleType,
      packageWeight,
      paymentMethod,
      instructions,
    } = req.body;

    const order = await Order.create({
      customer: req.user._id,
      customerName,
      phone,
      pickupLocation,
      dropLocation,
      pickupDate,
      pickupTime,
      packageType,
      vehicleType,
      packageWeight,
      paymentMethod,
      instructions,
      status: "Pending",
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Manager - Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer", "name email")
      .populate("driver", "name")
      .populate("vehicle");

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Customer - Get own orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      customer: req.user._id,
    })
      .populate("driver", "name")
      .populate("vehicle");

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const assignDriverVehicle = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { driverId, vehicleId } = req.body;

    const driver = await User.findById(driverId);

    if (!driver || driver.role !== "driver") {
      return res.status(404).json({
        message: "Driver not found",
      });
    }

    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.driver = driverId;
    order.vehicle = vehicleId;
    order.status = "Assigned";

    await order.save();

    res.json({
      message: "Driver and Vehicle assigned successfully",
      order,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createOrder,
  getOrders,
  getMyOrders,
};