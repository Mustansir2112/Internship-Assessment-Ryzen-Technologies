const router = require("express").Router();
const {
  createPolicy,
  getPoliciesOfCustomer,
  getPolicies,
} = require("../controllers/policy_controller");

router.post("/createPolicy", createPolicy);
router.get("/getPoliciesOfCustomer", getPoliciesOfCustomer);
router.get("/getPolicies", getPolicies);

module.exports = router;
