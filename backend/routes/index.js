import { Router } from "express";
import asaasRoutes from "./asaasRoutes.js";
import webHookRoutes from "./webHookRoutes.js";

const router = Router();

router.use("/asaas", asaasRoutes);
router.use("/webhook", webHookRoutes);

export default router;
