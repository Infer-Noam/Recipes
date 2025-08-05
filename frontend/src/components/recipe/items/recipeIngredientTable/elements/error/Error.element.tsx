import { Typography } from "@mui/material";
import type { FC } from "react";
import Styles from "./error.style";
import type { FieldError } from "react-hook-form";

type ErrorElementProps = {
  error: FieldError | undefined;
};
const ErrorElement: FC<ErrorElementProps> = ({ error }) => {
  if (!error) return null;

  return (
    <Typography color="error" variant="caption" sx={Styles.typography}>
      {error.message}
    </Typography>
  );
};

export default ErrorElement;
