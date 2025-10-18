import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Form.module.css";
import { Button } from "@mui/material";
import { InputField } from "@/components/form/InputField.tsx";
import { SelectField } from "@/components/form/SelectField.tsx";
import { FormHeader } from "@/components/form/FormHeader.tsx";
import { useGoogleSheets } from "@/hooks/useGoogleSheets.tsx";
import { SnackbarMessage } from "@/components/form/SnackbarMessage.tsx";
import { NumberSelectField } from "@/components/form/NumberSelectField.tsx";
import asaas from "@/services/asaas";
import { useFormContext } from "@/contexts/FormContext.tsx";
import { RetreatInfo } from "@/components/form/RetreatInfo.tsx";

function Form() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { sendData } = useGoogleSheets(import.meta.env.VITE_GOOGLE_SHEET_URL);
  const { form, setForm } = useFormContext();

  const sexOptions = ["Masculino", "Feminino"];
  const maritalStatusOptions = ["Solteiro", "Casado"];
  const ageGroupOptions = ["4-6", "7-9", "10-12", "Não se aplica"];
  const lodgingOptions = ["Barraca", "Alojamento", "Casa própria"];
  const ageOptions = ["0-5", "6-11", "Adulto"];
  const billingTypeOptions = ["UNDEFINED", "BOLETO", "CREDIT_CARD", "PIX"];
  const dueDate = new Date().toISOString().split("T")[0];

  const loteDataLimite = new Date("2025-12-31T23:59:59");
  const hoje = new Date();
  const valorAtual = hoje <= loteDataLimite ? 250 : 300;

  const monthInstallmentsMap: Record<number, number> = {
    10: 4,
    11: 3,
    12: 2,
    1: 1,
    2: 1,
  };

  const currentMonth = new Date().getMonth() + 1;
  const maxInstallments = monthInstallmentsMap[currentMonth] || 1;
  const installmentCountOptions = Array.from(
    { length: maxInstallments },
    (_, i) => i + 1
  );

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleChange = (name: string, value: string | number | null) => {
    setForm({ [name]: value });

    if (name === "billingType" && value !== "CREDIT_CARD") {
      setForm({ installmentCount: null });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const customerResponse = await asaas.createClient(
        form.name,
        form.cpf,
        form.email
      );
      const customer = customerResponse.id;

      const installmentCount =
        form.billingType === "CREDIT_CARD" ? form.installmentCount! : null;
      const paymentPayload =
        form.billingType === "CREDIT_CARD"
          ? { totalValue: valorAtual, installmentCount }
          : { value: valorAtual };

      const lastPayment = await asaas.createPayment(
        customer,
        form.billingType,
        dueDate,
        paymentPayload.installmentCount ?? null,
        paymentPayload.totalValue ?? paymentPayload.value
      );

      const allPayments = await asaas.listPayments(customer);

      const payload = {
        resumo: {
          ...form,
          customer,
          paymentId: lastPayment.id,
          invoiceUrl: lastPayment.invoiceUrl,
          status: lastPayment.status,
          valor: valorAtual,
        },
        pagamentos: allPayments.map((p) => ({
          customer,
          paymentId: p.id,
          name: form.name,
          lastName: form.lastName,
          description: p.description,
          invoiceUrl: p.invoiceUrl,
          status: p.status,
          valor: valorAtual,
        })),
      };

      await sendData(payload);

      setForm({
        ...form,
        customer,
        paymentId: lastPayment.id,
        invoiceUrl: lastPayment.invoiceUrl,
        status: lastPayment.status,
      });

      setSnackbarMessage(
        `Formulário enviado com sucesso! Valor: R$ ${valorAtual},00`
      );
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setTimeout(() => navigate("/confirmacao"), 1200);
    } catch (err: any) {
      console.error("Erro no envio:", err);
      setSnackbarMessage(err.message || "Erro ao enviar formulário");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <FormHeader
          imageSrc="/retiro.png"
          title="Inscrição Retiro Ponte Nova - 2026"
          subtitle={
            <>
              <div>Data: 14/02/2026 a 17/02/2026</div>
              <div>Valor: R$ {valorAtual},00</div>
            </>
          }
        />
        <RetreatInfo />
        <form onSubmit={handleSubmit} className={styles.form}>
          <InputField
            label="Nome"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <InputField
            label="Sobrenome"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
          />
          <InputField
            label="E-mail"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <InputField
            label="CPF"
            name="cpf"
            value={form.cpf}
            onChange={handleChange}
          />
          <SelectField
            label="Sexo"
            name="sex"
            value={form.sex}
            options={sexOptions}
            onChange={handleChange}
          />
          <SelectField
            label="Estado Civil"
            name="maritalStatus"
            value={form.maritalStatus}
            options={maritalStatusOptions}
            onChange={handleChange}
          />
          <InputField
            label="Cidade"
            name="city"
            value={form.city}
            onChange={handleChange}
          />
          <SelectField
            label="Idade"
            name="age"
            value={form.age}
            options={ageOptions}
            onChange={handleChange}
          />
          <SelectField
            label="Idade para Salinha"
            name="ageGroup"
            value={form.ageGroup}
            options={ageGroupOptions}
            onChange={handleChange}
          />
          <SelectField
            label="Alojamento"
            name="lodging"
            value={form.lodging}
            options={lodgingOptions}
            onChange={handleChange}
          />
          <InputField
            label="Telefone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
          <SelectField
            label="Forma de Pagamento"
            name="billingType"
            value={form.billingType}
            options={billingTypeOptions}
            onChange={handleChange}
          />

          {form.billingType === "CREDIT_CARD" && (
            <NumberSelectField
              label={`Número de Parcelas (até ${maxInstallments}x)`}
              name="installmentCount"
              value={form.installmentCount}
              options={installmentCountOptions}
              onChange={handleChange}
            />
          )}
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: "black" }}
            fullWidth
            disabled={isSubmitting}
            sx={{
              marginTop: 2,
              paddingY: 1,
              textTransform: "none",
              fontSize: "1rem",
            }}
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </Button>
        </form>
        <SnackbarMessage
          open={snackbarOpen}
          message={snackbarMessage}
          severity={snackbarSeverity}
          onClose={() => setSnackbarOpen(false)}
        />
      </div>
    </div>
  );
}

export default Form;
