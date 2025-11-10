const express = require("express");
const EmailController = require("../controllers/emailController");

const router = express.Router();

router.post("/send", EmailController.sendEmail);

module.exports = router;
