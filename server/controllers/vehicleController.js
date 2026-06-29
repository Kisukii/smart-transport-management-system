const Vehicle = require("../models/Vehicle");

// Add Vehicle
const addVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);

    res.status(201).json({
      message: "Vehicle added successfully",
      vehicle,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Vehicles
const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().sort({ createdAt: -1 });

    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Vehicle
const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    await Vehicle.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Vehicle deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
        message: error.message,
    });

  }
};

module.exports = {
  addVehicle,
  getVehicles,
  deleteVehicle,
};