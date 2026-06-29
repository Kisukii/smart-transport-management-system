const Order = require("../models/orderModel");
const User = require("../models/User");
const Vehicle = require("../models/Vehicle");

// Create Order
const createOrder = async (req, res) => {
  console.log(req.user);

  try {
    const {
      customerName,
      phone,
      customerPhone,
      receiverPhone,
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
      customer: req.user.id,
      customerName,
      phone: phone || customerPhone || receiverPhone,
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

// Get All Orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer", "name email")
      .populate("driver", "name driverId")
      .populate("vehicle", "vehicleId vehicleNumber");

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Logged-in Customer Orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      customer: req.user.id,
    })
      .populate("driver", "name driverId")
      .populate("vehicle", "vehicleId vehicleNumber");

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Driver Orders
const getDriverOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      driver: req.user.id,
    })
      .populate("customer", "name")
      .populate("vehicle", "vehicleId vehicleNumber");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Order
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      orderId: req.params.id,
    })
      .populate("customer", "_id name email")
      .populate("driver", "_id name driverId")
      .populate("vehicle", "_id vehicleId vehicleNumber");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (
      req.user.role === "user" &&
      order.customer &&
      order.customer._id.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    res.json(order);
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
  getDriverOrders,
  getOrderById,
};