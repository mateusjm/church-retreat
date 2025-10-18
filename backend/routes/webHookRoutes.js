import { Router } from "express";
import WebhookController from "../controllers/webhookController.js";

const router = Router();

router.get("/test", WebhookController.testWebhook);
router.post("/received", WebhookController.paymentReceived);
router.post("/confirmed", WebhookController.paymentConfirmed);
router.post("/created", WebhookController.paymentCreated);

export default router;
