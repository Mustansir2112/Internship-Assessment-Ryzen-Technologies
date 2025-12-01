const router = require("express").Router();
const {  createCustomer, getAllCustomers } = require("../controllers/customer_controller");

router.post("/createCustomer", createCustomer);
router.get("/getAllCustomers", getAllCustomers);

module.exports = router;

