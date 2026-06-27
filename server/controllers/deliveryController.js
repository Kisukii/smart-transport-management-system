const Delivery = require("../models/deliveryModel");

// Create delivery
const createDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.create(req.body);

    res.status(201).json({
      message: "Delivery created successfully",
      delivery,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all deliveries
const getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find()
      .populate("customerId", "name email phone address")
      .populate("driverId", "name phone licenseNumber status");

    res.status(200).json(deliveries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Customer delivery history
const getCustomerDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({
      customerId: req.params.customerId,
    }).populate("driverId", "name phone licenseNumber");

    res.status(200).json(deliveries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Driver assigned deliveries
const getDriverDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({
      driverId: req.params.driverId,
    }).populate("customerId", "name phone address");

    res.status(200).json(deliveries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update delivery status
const updateDeliveryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const delivery = await Delivery.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    res.status(200).json({
      message: "Delivery status updated",
      delivery,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Confirm delivery
const confirmDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findByIdAndUpdate(
      req.params.id,
      { status: "Delivered" },
      { new: true }
    );

    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    res.status(200).json({
      message: "Delivery confirmed successfully",
      delivery,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Track shipment
const trackShipment = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id)
      .populate("customerId", "name phone address")
      .populate("driverId", "name phone licenseNumber");

    if (!delivery) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    res.status(200).json({
      message: "Shipment tracking details",
      delivery,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Download receipt data
const downloadReceipt = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id)
      .populate("customerId", "name email phone address")
      .populate("driverId", "name phone licenseNumber");

    if (!delivery) {
      return res.status(404).json({ message: "Receipt not found" });
    }

    res.status(200).json({
      message: "Receipt generated successfully",
      receipt: {
        receiptId: delivery._id,
        customer: delivery.customerId,
        driver: delivery.driverId,
        packageName: delivery.packageName,
        pickupLocation: delivery.pickupLocation,
        deliveryLocation: delivery.deliveryLocation,
        status: delivery.status,
        date: delivery.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDelivery,
  getAllDeliveries,
  getCustomerDeliveries,
  getDriverDeliveries,
  updateDeliveryStatus,
  confirmDelivery,
  trackShipment,
  downloadReceipt,
};