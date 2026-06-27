const User = require("../models/User");

exports.getDrivers = async (req, res) => {
  try {
    const drivers = await User.find({ role: "driver" }).select("-password");

    res.status(200).json(drivers);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};