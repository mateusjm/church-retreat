import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";

type SelectFieldProps = {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (name: string, value: string) => void;
};

const billingTypeLabels: Record<string, string> = {
  BOLETO: "Boleto",
  CREDIT_CARD: "Cartão de Crédito",
  PIX: "PIX",
};

export const SelectField = ({
  label,
  name,
  value,
  options,
  onChange,
}: SelectFieldProps) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(name, event.target.value);
  };

  const filteredOptions = options.filter((opt) => opt !== "UNDEFINED");

  return (
    <FormControl fullWidth variant="standard">
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={handleChange} label={label} required>
        {filteredOptions.map((opt) => (
          <MenuItem key={opt} value={opt}>
            {billingTypeLabels[opt] ?? opt}
          </MenuItem>
        ))}

        {value === "UNDEFINED" && (
          <MenuItem value="UNDEFINED" style={{ display: "none" }} />
        )}
      </Select>
    </FormControl>
  );
};
