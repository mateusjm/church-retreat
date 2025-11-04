const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

class GoogleSheetsController {
  static async sendData(req, res) {
    try {
      const data = req.body;

      console.log("Enviando dados ao Google Sheets:", data);

      const response = await axios.post(GOOGLE_SCRIPT_URL, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Resposta do Google Sheets:", response.data);

      res.status(200).json({
        result: "success",
        message: "Dados enviados ao Google Sheets com sucesso!",
        data: response.data,
      });
    } catch (err) {
      console.error("Erro ao enviar para o Google Sheets:", err.response?.data || err.message);

      res.status(err.response?.status || 500).json({
        result: "error",
        message: err.response?.data?.message || err.message || "Erro ao enviar os dados",
      });
    }
  }
}

module.exports = GoogleSheetsController;
