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
        <strong>ÚLTIMAS VAGAS</strong>
        <br />
        0 - 5 anos - Isento
        <br />
        6 - 11 anos - R$100,00
        <br />
        12 a 14 anos - R$150,00
        <br />
        15 - 75 anos - R$300,00
        <br />
        Acima de 75 anos - R$150,00
        <br />
        <br />
        <strong>DATAS DO RETIRO:</strong>
        <br />
        Quinta – 30/04/2026
        <br />
        Sexta – 01/05/2026
        <br />
        Sábado – 02/05/2026
        <br />
        Domingo – 03/05/2026
      </p>
    </div>
  );
};
