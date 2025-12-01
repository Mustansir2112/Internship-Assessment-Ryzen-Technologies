const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: String,
  email: String,
  city: String,
});

module.exports = mongoose.model("Customer", customerSchema);
