import { type FC } from "react";
import { Controller, type Control, type FieldError } from "react-hook-form";
import { TextField, type TextFieldProps } from "@mui/material";

type ControlledTextFieldProps = TextFieldProps & {
  name: string;
  control: Control<any>;
  fieldError?: FieldError | undefined;
};

const ControlledTextField: FC<ControlledTextFieldProps> = ({
  name,
  control,
  fieldError,
  ...rest
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        {...rest}
        error={!!fieldError}
        helperText={fieldError?.message}
      />
    )}
  />
);

export default ControlledTextField;
