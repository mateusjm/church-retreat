const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const routes = require("./routes/index");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", routes);

// só inicia o servidor se NÃO estiver em produção (Vercel cuida disso)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

module.exports = app;
