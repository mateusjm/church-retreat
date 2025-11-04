const express = require("express");
const router = express.Router();
const GoogleSheetsController = require("../controllers/googleSheetController");

router.post("/send", GoogleSheetsController.sendData);

module.exports = router;
