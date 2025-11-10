const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, 
  auth: {
    user: "9b30fd001@smtp-brevo.com", 
    pass: process.env.BREVO_SMTP_KEY, 
  },
});

class EmailController {
  static async sendEmail(req, res) {
    try {
      const { name, email, invoiceUrl } = req.body;

      if (!name || !email || !invoiceUrl) {
        return res.status(400).json({ error: "Campos obrigatórios faltando." });
      }

      const templatePath = path.join(
        __dirname,
        "../templates/email/invoiceTemplate.html"
      );

      let htmlTemplate = fs.readFileSync(templatePath, "utf8");
      htmlTemplate = htmlTemplate
        .replace(/{{name}}/g, name)
        .replace(/{{invoiceUrl}}/g, invoiceUrl);

      await transporter.sendMail({
        from: '"Igreja de Cristo em Ponte Nova" <igrejaempninscricao@gmail.com>',
        to: `${name} <${email}>`,
        subject: "Olá, uma cobrança foi gerada para você",
        html: htmlTemplate,
      });

      return res.status(200).json({ message: "E-mail enviado com sucesso!" });
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      res.status(500).json({ error: "Erro ao enviar e-mail." });
    }
  }
}

module.exports = EmailController;
