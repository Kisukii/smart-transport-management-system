const Order = require("../models/orderModel");
const User = require("../models/User");
const Vehicle = require("../models/Vehicle");

const createOrder = async (req, res) => {console.log(req.user);
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

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email driverId")
      .populate("driver", "name driverId")
      .populate("vehicle", "vehicleId registrationNumber");

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      customer: req.user.id,
    })
      .populate("driver", "name driverId")
      .populate("vehicle", "vehicleId registrationNumber");

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.id })
      .populate("user", "_id name email driverId")
      .populate("driver", "_id name driverId")
      .populate("vehicle", "_id vehicleId registrationNumber");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (
      req.user.role === "user" &&
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
  getOrderById,
};