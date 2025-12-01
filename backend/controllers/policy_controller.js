const Policy = require("../model/policy");
const Customer = require("../model/customer");

exports.createPolicy = async (req, res) => {
  try {
    const {
      customer_email,
      policy_type,
      premium_amount,
      start_date,
      end_date,
      status,
    } = req.body;

    const customer = await Customer.findOne({ email: customer_email });
    if (!customer) {
      return res.status(400).json({ message: "Customer not found" });
    }

    const newPolicy = await Policy.create({
      customer_id: customer._id,
      policy_type,
      premium_amount,
      start_date,
      end_date,
      status,
    });

    if (!customer.policies) customer.policies = [];
    customer.policies.push(newPolicy._id);
    await customer.save();

    return res.status(201).json({
      success: true,
      message: "Policy created successfully",
      policy: newPolicy,
    });
  } catch (err) {
    console.error("Error creating policy:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getPoliciesOfCustomer = async (req, res) => {
  try {
    const policies = await Policy.find({}).populate(
      "customer_id",
      "name city email"
    );

    return res.status(200).json({
      success: true,
      policies,
    });
  } catch (err) {
    console.error("Error getting policies:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getPolicies = async (req, res) => {
  try {
    const { policy_type, status, city } = req.query;

    const filter = {};

    if (policy_type) filter.policy_type = policy_type;
    if (status) filter.status = status;

    if (city) {
      const customers = await Customer.find({
        city: new RegExp(city, "i"),
      });

      const ids = customers.map((c) => c._id);

      if (ids.length === 0) {
        return res.status(200).json({ success: true, policies: [] });
      }

      filter.customer_id = { $in: ids };
    }

    const policies = await Policy.find(filter).populate(
      "customer_id",
      "name city email"
    );

    return res.status(200).json({
      success: true,
      policies,
    });
  } catch (err) {
    console.error("Error getting policies:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
