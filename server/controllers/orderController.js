const Order = require("../models/orderModel");

// Create Order
const createOrder = async (req, res) => {
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
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
  }
};

// Get Customer Orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      customer: req.user.id,
    })
      .populate("driver", "name driverId")
      .populate("vehicle", "vehicleId vehicleNumber");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Orders assigned to Driver
const getDriverOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      driver: req.user.id,
      status: "Assigned",
    })
      .populate("customer", "name")
      .populate("vehicle", "vehicleId vehicleNumber");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Driver Deliveries
const getMyDeliveries = async (req, res) => {
  try {
    const orders = await Order.find({
      driver: req.user.id,
      status: {
        $in: [
          "Accepted",
          "Picked Up",
          "In Transit",
          "Delivered",
        ],
      },
    })
      .populate("customer", "name")
      .populate("vehicle", "vehicleId vehicleNumber");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Accept Order
const acceptOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order)
      return res.status(404).json({
        message: "Order not found",
      });

    order.status = "Accepted";
    await order.save();

    res.json({
      message: "Order Accepted",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reject Order
const rejectOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order)
      return res.status(404).json({
        message: "Order not found",
      });

    order.status = "Rejected";
    await order.save();

    res.json({
      message: "Order Rejected",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = status;

    await order.save();

    res.json({
      message: "Status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Order By ID
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

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Dashboard Data
const getDashboardData = async (req, res) => {
  try {
    const orders = await Order.find({
      customer: req.user.id,
    })
      .populate("driver", "name driverId")
      .populate("vehicle", "vehicleNumber");

    const total = orders.length;
    const pending = orders.filter(o => o.status === "Pending").length;

    const transit = orders.filter(o =>
      ["Accepted", "Picked Up", "In Transit"].includes(o.status)
    ).length;

    const delivered = orders.filter(
      o => o.status === "Delivered"
    ).length;

    const currentShipment =
      orders.find(o =>
        ["Accepted", "Picked Up", "In Transit"].includes(o.status)
      ) || null;

    res.json({
      total,
      pending,
      transit,
      delivered,
      currentShipment,
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
  getDriverOrders,
  getMyDeliveries,
  acceptOrder,
  rejectOrder,
  updateOrderStatus,
  getOrderById,
  getDashboardData,
};