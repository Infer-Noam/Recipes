import {
  Controller,
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { TextField, type TextFieldProps } from "@mui/material";

type ControlledTextFieldProps<T extends FieldValues> = TextFieldProps & {
  name: Path<T>;
  control: Control<T>;
  fieldError?: FieldError;
};

const ControlledTextField = <T extends FieldValues>({
  name,
  control,
  fieldError,
  ...rest
}: ControlledTextFieldProps<T>) => (
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
