import { type FC } from "react";
import { Controller, type Control } from "react-hook-form";
import { TextField, type TextFieldProps } from "@mui/material";

type ControlledTextFieldProps = TextFieldProps & {
  name: string;
  control: Control<any>;
};

const ControlledTextField: FC<ControlledTextFieldProps> = ({
  name,
  control,
  ...rest
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => <TextField {...field} {...rest} />}
  />
);

export default ControlledTextField;
