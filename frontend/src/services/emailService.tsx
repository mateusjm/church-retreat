import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const emailService = {
  async sendInvoiceEmail(name: string, email: string, invoiceUrl: string) {
    return axios.post(`${API_URL}/email/send`, {
      name,
      email,
      invoiceUrl,
    });
  },
};
