import styles from "./RetreatInfo.module.css";

export const RetreatInfo = () => {
  return (
    <div className={styles.infoSection}>
      <p>
        <strong>É IMPORTANTE RESSALTAR QUE O VALOR DO RETIRO É:</strong>
        <br />
        1º LOTE: até 31/12/2025– R$ 250,00
        <br />
        2º LOTE: a partir de 01/01/2026 –{" "}
        R$ 300,00
        <br />
        <br />
        <strong>FORMA DE PAGAMENTO:</strong> 
        <br />
        PIX, dinheiro ou cartão, com
        parcelamento em out, nov, dez e jan.
        <br />
        <br />
        <strong>Cartão:</strong>
        <br />até <strong>4x</strong> no cartão até{" "}
        <strong>31/10/2025</strong>
        <br />até <strong>3x</strong> no cartão até{" "}
        <strong>31/11/2025</strong>
        <br />até <strong>2x</strong> no cartão até{" "}
        <strong>31/12/2025</strong>
        <br /><strong>1x</strong> no cartão até <strong>10/02/2026</strong>
        <br />
        <br />
        <strong>DATAS DO RETIRO:</strong>
        <br />
        Sábado – 14/02/2026
        <br />
        Domingo – 15/02/2026
        <br />
        Segunda – 16/02/2026
        <br />
        Terça – 17/02/2026
      </p>
    </div>
  );
};
