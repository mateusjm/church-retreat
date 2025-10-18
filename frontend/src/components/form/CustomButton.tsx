import { Button } from "@mui/material";

type CustomButtonProps = {
  children: React.ReactNode;
  isSubmitting?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  fullWidth?: boolean;
};

export const CustomButton = ({
  children,
  isSubmitting = false,
  type = "button",
  onClick,
  fullWidth = false,
}: CustomButtonProps) => {
  return (
    <Button
      type={type}
      fullWidth={fullWidth}
      disabled={isSubmitting}
      onClick={onClick}
      sx={{
        marginTop: 2,
        paddingY: 1,
        fontSize: "1rem",
        textTransform: "none",
        backgroundColor: "black",
        color: "white",
        "&:hover": {
          backgroundColor: "#333",
        },
        "&.Mui-disabled": {
          color: "white",
          backgroundColor: "black",
          opacity: 0.8,
        },
      }}
    >
      {isSubmitting ? "Enviando..." : children}
    </Button>
  );
};
