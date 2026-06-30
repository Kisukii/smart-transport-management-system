const OrderRequest = require("../models/orderRequestModel");
const Order = require("../models/orderModel");

// Customer creates order request
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

// Manager/Admin view pending requests
const getAllRequests = async (req, res) => {
  try {
    const requests = await OrderRequest.find({
      status: "Pending",
    })
      .populate("customer", "name email")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Manager/Admin view approved requests
const getApprovedRequests = async (req, res) => {
  try {
    const requests = await OrderRequest.find({
      status: "Approved",
    })
      .populate("customer", "name email")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Customer views own requests
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

// Manager approves request
const approveOrderRequest = async (req, res) => {
  try {
    const request = await OrderRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Order request not found",
      });
    }

    request.status = "Approved";
    await request.save();

    res.json({
      message: "Order request approved successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Manager rejects request
const rejectOrderRequest = async (req, res) => {
  try {
    const request = await OrderRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Order request not found",
      });
    }

    request.status = "Rejected";
    await request.save();

    res.json({
      message: "Order request rejected successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Manager assigns driver & vehicle
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

    request.status = "Assigned";
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

// Driver accepts assigned order
const acceptOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (order.driver.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    order.status = "Accepted";
    await order.save();

    res.json({
      message: "Order accepted",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Driver rejects assigned order
const rejectOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (order.driver.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    order.status = "Rejected";
    order.driver = null;
    order.vehicle = null;

    await order.save();

    res.json({
      message: "Order rejected",
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
  getApprovedRequests,
  getMyRequests,
  approveOrderRequest,
  rejectOrderRequest,
  assignOrder,
  acceptOrder,
  rejectOrder,
};