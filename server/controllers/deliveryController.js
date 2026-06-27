const Delivery = require("../models/deliveryModel");

// Get deliveries for a customer
const getCustomerDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({
      customerId: req.params.customerId,
    });

    res.status(200).json(deliveries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get deliveries for a driver
const getDriverDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({
      driverId: req.params.driverId,
    });

    res.status(200).json(deliveries);
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
      return res.status(404).json({
        message: "Delivery not found",
      });
    }

    res.status(200).json({
      message: "Delivery confirmed",
      delivery,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCustomerDeliveries,
  getDriverDeliveries,
  confirmDelivery,
};