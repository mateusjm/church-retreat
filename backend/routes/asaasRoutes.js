import express from "express";
import AsaasController from "../controllers/asaasController.js";

const router = express.Router();

router.post("/customers", AsaasController.createClient);
router.post("/payments", AsaasController.createPayment);
router.get("/payments/:customerId", AsaasController.listPayments);

export default router;
