import { Router } from "express";
import asaasRoutes from "./asaasRoutes.js";
import webHookRoutes from "./webHookRoutes.js";
import timeRoutes from "./timeRoutes.js"; 

const router = Router();

router.use("/asaas", asaasRoutes);
router.use("/webhook", webHookRoutes);
router.use("/time", timeRoutes); 

export default router;
