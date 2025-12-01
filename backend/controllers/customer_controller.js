const customer = require('../model/customer');

exports.createCustomer = async (req, res) => {
  try {
    const { name, phone, email, city } = req.body;
    const user = await customer.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newCustomer = new customer({ name, phone, email, city });
    await newCustomer.save();
    return res.status(201).json({ message: "Customer created successfully" });
  } catch (err) {
    console.error("Error creating customer:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await customer.find({});
    return res.status(200).json(customers);
  } catch (err) {
    console.error("Error getting customers:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
