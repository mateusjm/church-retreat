import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import routes from "./routes/index.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", routes);

app.listen(4000, () => console.log("Proxy Asaas rodando na porta 4000"));
