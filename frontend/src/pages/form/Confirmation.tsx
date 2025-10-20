import { useFormContext } from "@/contexts/FormContext.tsx";
import styles from "./Form.module.css";
import { FormHeader } from "@/components/form/FormHeader.tsx";

function Confirmation() {
  const { form } = useFormContext();
  const isIsento = form.age === "0-5";

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <FormHeader imageSrc="/retiro.png" title="" />
        <div className={styles.form} style={{ textAlign: "center" }}>
          <h2>Obrigado! Sua inscrição foi finalizada. 🎉</h2>

          {!isIsento && form.invoiceUrl && (
            <p>
              Segue o link da fatura abaixo: <br />
              <a
                href={form.invoiceUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1a73e8", textDecoration: "underline" }}
              >
                Acessar Fatura
              </a>
            </p>
          )}

          {isIsento && (
            <p>Participação gratuita para crianças de 0 a 5 anos. 💚</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
