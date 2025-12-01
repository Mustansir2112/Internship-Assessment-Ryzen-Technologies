const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  policy_type: String,
  premium_amount: Number,
  start_date: Date,
  end_date: Date,
  status: String,
});

module.exports = mongoose.model("Policy", policySchema);
