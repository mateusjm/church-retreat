const express = require("express");
const asaasRoutes = require("./asaasRoutes");
const webHookRoutes = require("./webHookRoutes");
const timeRoutes = require("./timeRoutes");
const googleSheetsRoutes = require("./googleSheetsRoutes");

const router = express.Router();

router.use("/asaas", asaasRoutes);
router.use("/webhook", webHookRoutes);
router.use("/time", timeRoutes);
router.use("/google-sheets", googleSheetsRoutes);

module.exports = router;
