import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

interface SnackbarMessageProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: "success" | "error" | "info" | "warning";
}

const Alert = React.forwardRef<HTMLDivElement>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackbarMessage: React.FC<SnackbarMessageProps> = ({
  open,
  onClose,
  message,
  severity = "info",
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};
