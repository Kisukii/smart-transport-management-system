const Driver = require("../models/Driver");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerDriver = async (req, res) => {
  try {
    const { name, email, password, phone, licenseNumber } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Enter a valid email address" });
    }

    const existingDriver = await Driver.findOne({ email });

    if (existingDriver) {
      return res.status(400).json({ message: "Driver already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const driver = await Driver.create({
      name,
      email,
      password: hashedPassword,
      phone,
      licenseNumber,
    });

    res.status(201).json({
      message: "Driver registered successfully",
      driver,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginDriver = async (req, res) => {
  try {
    const { email, password } = req.body;

    const driver = await Driver.findOne({ email });

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    const isMatch = await bcrypt.compare(password, driver.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: driver._id, role: "driver" },
      process.env.JWT_SECRET || "driversecret",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Driver login successful",
      token,
      driver,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get one driver by id
const getDriverProfile = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id).select("-password");

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDriverProfile = async (req, res) => {
  res.json({ message: "Update Driver Profile" });
};

const getDriverDeliveries = async (req, res) => {
  res.json({
    message: "Driver Deliveries",
    deliveries: [],
  });
};

const confirmDelivery = async (req, res) => {
  res.json({ message: "Delivery Confirmed" });
};

const reportVehicleIssue = async (req, res) => {
  res.json({ message: "Vehicle Issue Report Submitted" });
};

const getDriverNotifications = async (req, res) => {
  res.json({
    message: "Driver Notifications",
    notifications: [],
  });
};

module.exports = {
  registerDriver,
  loginDriver,
  getDriverProfile,
  updateDriverProfile,
  getDriverDeliveries,
  confirmDelivery,
  reportVehicleIssue,
  getDriverNotifications,
};