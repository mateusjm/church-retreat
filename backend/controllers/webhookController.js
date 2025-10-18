import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export default class WebhookController {
  static async paymentConfirmed(req, res) {
    const ASAASTOKEN = process.env.WEBHOOK_TOKEN || "";
    const token = req.headers["asaas-access-token"];

    if (ASAASTOKEN && token !== ASAASTOKEN) {
      return res.status(401).send("Não autorizado");
    }

    const { event, payment } = req.body || {};

    console.log(`Webhook recebido: ${event}`);

    if (event === "PAYMENT_CONFIRMED") {
      console.log(
        `Pagamento confirmado! id: ${payment?.id}, valor: ${payment?.value}`
      );

      const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
      if (!googleScriptUrl) {
        console.error("GOOGLE_SCRIPT_URL não definido no .env!");
        return res.status(500).send("Configuração do servidor ausente");
      }

      try {
        const response = await axios.post(
          googleScriptUrl,
          {
            customer: payment.customer,
            invoiceUrl: payment.invoiceUrl,
            status: "CONFIRMED",
            paymentId: payment.id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Resposta do App Script:", response.data);
      } catch (err) {
        console.error(
          "Erro ao atualizar planilha via App Script:",
          err.message
        );
      }
    }

    res.status(200).send("ok");
  }

  static async paymentCreated(req, res) {
    const ASAASTOKEN = process.env.WEBHOOK_TOKEN || "";
    const token = req.headers["asaas-access-token"];

    if (ASAASTOKEN && token !== ASAASTOKEN) {
      return res.status(401).send("Não autorizado");
    }

    const { event, payment } = req.body || {};

    console.log(`Webhook recebido: ${event}`);

    if (event === "PAYMENT_CREATED") {
      console.log(
        `Pagamento criado! id: ${payment?.id}, valor: ${payment?.value}, tipo: ${payment?.billingType}`
      );
    }

    res.status(200).send("ok");
  }

  static async paymentReceived(req, res) {
    const ASAASTOKEN = process.env.WEBHOOK_TOKEN || "";
    const token = req.headers["asaas-access-token"];

    if (ASAASTOKEN && token !== ASAASTOKEN) {
      return res.status(401).send("Não autorizado");
    }

    const { event, payment } = req.body || {};

    console.log(`Webhook recebido: ${event}`);

    if (event === "PAYMENT_RECEIVED") {
      console.log(
        `Pagamento recebido! id: ${payment?.id}, valor: ${payment?.value}, status: ${payment?.status}`
      );

      const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
      if (!googleScriptUrl) {
        console.error("GOOGLE_SCRIPT_URL não definido no .env!");
        return res.status(500).send("Configuração do servidor ausente");
      }

      try {
        const response = await axios.post(
          googleScriptUrl,
          {
            customer: payment.customer,
            invoiceUrl: payment.invoiceUrl,
            status: "RECEIVED",
            paymentId: payment.id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Resposta do App Script:", response.data);
      } catch (err) {
        console.error(
          "Erro ao atualizar planilha via App Script:",
          err.message
        );
      }
    }

    res.status(200).send("ok");
  }

  static testWebhook(req, res) {
    console.log("Verificação GET recebida no webhook!");
    res.status(200).send("Webhook ativo e aguardando POST");
  }
}
