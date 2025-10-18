import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export async function getServerTime(): Promise<Date> {
  try {
    const response = await axios.get(`${VITE_API_URL}/time`); 
    const { iso } = response.data;
    return new Date(iso);
  } catch (error) {
    console.error("Erro ao obter hora do servidor, usando hora local:", error);
    return new Date(); 
  }
}

export async function getServerTimestamp(): Promise<number> {
  try {
    const response = await axios.get(`${VITE_API_URL}/time`);
    return response.data.timestamp;
  } catch (error) {
    console.error(
      "Erro ao obter timestamp do servidor, usando hora local:",
      error
    );
    return Date.now(); 
  }
}
