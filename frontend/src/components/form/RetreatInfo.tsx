import styles from "./RetreatInfo.module.css";

export const RetreatInfo = () => {
  return (
    <div className={styles.infoSection}>
      <p>
        <strong>VALOR DO RETIRO:</strong>
        <br />
        R$ 300,00
        <br />
        <br />
        <strong>FORMA DE PAGAMENTO:</strong> 
        <br />
        PIX, boleto
        <br />
        <br />
        <strong>DATAS DO RETIRO:</strong>
        <br />
        Quinta – 30/04/2026
        <br />
        Sexta  – 01/05/2026
        <br />
        Sábado – 02/05/2026
        <br />
        Domingo  – 03/05/2026
      </p>
    </div>
  );
};
