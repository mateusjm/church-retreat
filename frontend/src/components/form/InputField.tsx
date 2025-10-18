import { FormControl, InputLabel, Input } from "@mui/material";
import type { ChangeEvent } from "react";

type InputFieldProps = {
  label: string;
  name: string;
  value: string | number;
  type?: "text" | "number";
  onChange: (name: string, value: string) => void;
};

export const InputField = ({
  label,
  name,
  value,
  type = "text",
  onChange,
}: InputFieldProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(name, event.target.value);
  };

  return (
    <FormControl fullWidth variant="standard">
      <InputLabel>{label}</InputLabel>
      <Input
        required
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
      />
    </FormControl>
  );
};
