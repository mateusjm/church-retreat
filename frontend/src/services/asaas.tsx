import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const asaas = {
  createClient: async (name: string, cpfCnpj: string, email: string) => {
    try {
      const response = await axios.post(
        `${VITE_API_URL}/asaas/customers`,
        { name, cpfCnpj, email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Cliente criado com sucesso:", response.data);
      return response.data;
    } catch (error: any) {
      console.error(
        "Erro ao criar cliente:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  createPayment: async (
    customer: string,
    billingType: string,
    dueDate: string,
    installmentCount: number | null,
    value: number
  ) => {
    try {
      const payload: any = {
        customer,
        billingType,
        dueDate,
      };

      if (billingType === "CREDIT_CARD") {
        payload.totalValue = value;
        payload.installmentCount = installmentCount;
      } else {
        payload.value = value;
      }

      const response = await axios.post(
        `${VITE_API_URL}/asaas/payments`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Cobrança criada com sucesso:", response.data);
      return response.data;
    } catch (error: any) {
      console.error(
        "Erro ao criar pagamento:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  listPayments: async (customerId: string) => {
    try {
      const response = await axios.get(
        `${VITE_API_URL}/asaas/payments/${customerId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(`Pagamentos do cliente ${customerId}:`, response.data);
      return response.data;
    } catch (error: any) {
      console.error(
        "Erro ao listar pagamentos:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
};

export default asaas;
