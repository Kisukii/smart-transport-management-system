const OrderRequest = require("../models/orderRequestModel");
const Order = require("../models/orderModel");

const createOrderRequest = async (req, res) => {
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

    const request = await OrderRequest.create({
      customer: req.user.id,
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

    res.status(201).json({
      message: "Order request submitted successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllRequests = async (req, res) => {
  try {
    const requests = await OrderRequest.find({ status: "Pending" })
      .populate("customer", "name email")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyRequests = async (req, res) => {
  try {
    const requests = await OrderRequest.find({
      customer: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const assignOrder = async (req, res) => {
  try {
    const { driver, vehicle } = req.body;

    const request = await OrderRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    const order = await Order.create({
      customer: request.customer,
      customerName: request.customerName,
      phone: request.phone,
      pickupLocation: request.pickupLocation,
      dropLocation: request.dropLocation,
      pickupDate: request.pickupDate,
      pickupTime: request.pickupTime,
      packageType: request.packageType,
      vehicleType: request.vehicleType,
      packageWeight: request.packageWeight,
      paymentMethod: request.paymentMethod,
      instructions: request.instructions,

      driver,
      vehicle,

      status: "Assigned",
    });

    request.status = "Approved";
    await request.save();

    res.status(200).json({
      message: "Order assigned successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createOrderRequest,
  getAllRequests,
  getMyRequests,
  assignOrder,
};