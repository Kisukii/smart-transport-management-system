const Customer = require("../models/customerModel");

// register customer
const registerCustomer = async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body;

    if (!name || !email || !phone || !address || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingCustomer = await Customer.findOne({ email });

    if (existingCustomer) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    const customer = await Customer.create({
      name,
      email,
      phone,
      address,
      password,
    });

    res.status(201).json({
      message: "Customer registered successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login customer
const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const customer = await Customer.findOne({ email });

    if (!customer || customer.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Customer login successful",
      customer,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get customer profile
const getCustomerProfile = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerCustomer,
  loginCustomer,
  getCustomerProfile,
};