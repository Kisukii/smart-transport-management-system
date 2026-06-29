const User = require("../models/User");

const generateDriverId = () => {
  return `DRV-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
};

exports.getDrivers = async (req, res) => {
  try {
    const drivers = await User.find({ role: "driver" }).select("-password");

    const updates = [];
    drivers.forEach((driver) => {
      if (!driver.driverId) {
        const newDriverId = generateDriverId();
        driver.driverId = newDriverId;
        updates.push(
          User.updateOne({ _id: driver._id }, { driverId: newDriverId })
        );
      }
    });

    if (updates.length > 0) {
      await Promise.all(updates);
    }

    res.status(200).json(drivers);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};