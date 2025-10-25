const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const ASAAS_API = "https://api-sandbox.asaas.com/v3";
const ASAAS_KEY = process.env.API_KEY_SAAS;

class AsaasController {
  static async createClient(req, res) {
    try {
      const response = await axios.post(`${ASAAS_API}/customers`, req.body, {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Igreja de Cristo em Ponte Nova",
          access_token: ASAAS_KEY,
        },
      });
      res.json(response.data);
    } catch (err) {
      res
        .status(err.response?.status || 500)
        .json(err.response?.data || err.message);
    }
  }

  static async createPayment(req, res) {
    try {
      const response = await axios.post(`${ASAAS_API}/payments`, req.body, {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Igreja de Cristo em Ponte Nova",
          access_token: ASAAS_KEY,
        },
      });
      res.json(response.data);
    } catch (err) {
      res
        .status(err.response?.status || 500)
        .json(err.response?.data || err.message);
    }
  }

  static async listPayments(req, res) {
    const { customerId } = req.params;
    try {
      const response = await axios.get(`${ASAAS_API}/payments`, {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Igreja de Cristo em Ponte Nova",
          access_token: ASAAS_KEY,
        },
        params: { customer: customerId },
      });
      res.json(response.data.data);
    } catch (err) {
      res
        .status(err.response?.status || 500)
        .json(err.response?.data || err.message);
    }
  }
}

module.exports = AsaasController;
