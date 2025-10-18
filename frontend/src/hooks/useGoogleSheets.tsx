import { useState, useRef } from "react";
import axios from "axios";

export const useGoogleSheets = (url: string, cooldown = 2000) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const lastSent = useRef<number>(0);

  const sendData = async (data: any) => {
    const now = Date.now();
    if (now - lastSent.current < cooldown) {
      setError(
        `Aguarde ${cooldown / 1000} segundos antes de enviar novamente.`
      );
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      console.log( "Enviando para Google Sheets:", data.sheetName, data);

      const res = await axios.post(url, data, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Resposta do Google Sheets:", res.data);

      if (res.status === 200 && res.data.result === "success") {
        setSuccess(true);
        lastSent.current = Date.now();
      } else {
        const message = res.data?.message || "Erro ao enviar os dados";
        setError(message);
        console.error("Erro recebido:", message);
      }
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Erro inesperado ao enviar os dados";

      setError(message);
      console.error("Erro de requisição:", message, err);
    } finally {
      setLoading(false);
    }
  };

  return { sendData, loading, error, success };
};
