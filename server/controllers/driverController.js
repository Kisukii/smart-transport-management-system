const User = require("../models/User");

const generateDriverId = () => {
  return `DRV-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`;
};

// Get all drivers
const getDrivers = async (req, res) => {
  try {
    const drivers = await User.find({ role: "driver" }).select("-password");

    const updates = [];

    drivers.forEach((driver) => {
      if (!driver.driverId) {
        const newDriverId = generateDriverId();
        driver.driverId = newDriverId;

        updates.push(
          User.updateOne(
            { _id: driver._id },
            { driverId: newDriverId }
          )
        );
      }

      if (!driver.status) {
        driver.status = "Available";

        updates.push(
          User.updateOne(
            { _id: driver._id },
            { status: "Available" }
          )
        );
      }
    });

    if (updates.length) {
      await Promise.all(updates);
    }

    res.status(200).json(drivers);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get logged in driver
const getDriverProfile = async (req, res) => {
  try {
    const driver = await User.findById(req.user.id).select("-password");

    if (!driver) {
      return res.status(404).json({
        message: "Driver not found",
      });
    }

    res.json(driver);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update driver status
const updateDriverStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const driver = await User.findById(req.user.id);

    if (!driver) {
      return res.status(404).json({
        message: "Driver not found",
      });
    }

    driver.status = status;

    await driver.save();

    res.json({
      message: "Status Updated Successfully",
      driver,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDrivers,
  getDriverProfile,
  updateDriverStatus,
};