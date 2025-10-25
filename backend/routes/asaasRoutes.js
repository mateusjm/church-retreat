const express = require("express");
const AsaasController = require("../controllers/asaasController");

const router = express.Router();

router.post("/customers", AsaasController.createClient);
router.post("/payments", AsaasController.createPayment);
router.get("/payments/:customerId", AsaasController.listPayments);

module.exports = router;
