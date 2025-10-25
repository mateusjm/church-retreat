const express = require("express");
const WebhookController = require("../controllers/webhookController");

const router = express.Router();

router.get("/test", WebhookController.testWebhook);
router.post("/received", WebhookController.paymentReceived);
router.post("/confirmed", WebhookController.paymentConfirmed);
router.post("/created", WebhookController.paymentCreated);

module.exports = router;

