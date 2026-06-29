const User = require("../models/User");

const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "" }).sort({
      createdAt: -1,
    });

    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getCustomers,
};