import { TextField, MenuItem } from "@mui/material";

type NumberSelectFieldProps = {
  label: string;
  name: string;
  value: number | null;
  options: number[];
  onChange: (name: string, value: number | null) => void;
};

export const NumberSelectField = ({
  label,
  name,
  value,
  options,
  onChange,
}: NumberSelectFieldProps) => {
  return (
    <TextField
      select
      required
      label={label}
      value={value ?? ""}
      onChange={(e) => {
        const val = e.target.value;
        onChange(name, val === "" ? null : Number(val));
      }}
      fullWidth
      variant="standard"
    >
      {options.map((opt) => (
        <MenuItem key={opt} value={opt}>
          {opt}
        </MenuItem>
      ))}
    </TextField>
  );
};
