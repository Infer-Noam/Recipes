import { Typography } from "@mui/material";
import type { FC } from "react";
import Styles from "./errorElement.style";

type ErrorElementProps = {
  error: boolean;
  errorMessage: string;
};
const ErrorElement: FC<ErrorElementProps> = ({
  error,
  errorMessage: message,
}) => {
  if (!error) return null;

  return (
    <Typography color="error" variant="caption" sx={Styles.typography}>
      {message}
    </Typography>
  );
};

export default ErrorElement;
