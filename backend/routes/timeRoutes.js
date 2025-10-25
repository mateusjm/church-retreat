const express = require("express");
const router = express.Router();

/**
 * GET /time
 * Retorna a hora atual do servidor em ISO 8601 e timestamp
 */
router.get("/", (req, res) => {
  const now = new Date();
  res.json({
    iso: now.toISOString(),
    timestamp: now.getTime(),
  });
});

module.exports = router;
