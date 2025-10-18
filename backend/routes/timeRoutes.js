import { Router } from "express";

const router = Router();

/**
 * GET /time
 * Retorna a hora atual do servidor em ISO 8601 e timestamp
 */
router.get("/", (req, res) => {
  const now = new Date(); // hora do servidor
  res.json({
    iso: now.toISOString(),
    timestamp: now.getTime(),
  });
});

export default router;
