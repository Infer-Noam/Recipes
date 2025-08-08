import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { TextField, type TextFieldProps } from "@mui/material";
import type { ChangeEvent } from "react";

type ControlledTextFieldProps<T extends FieldValues> = TextFieldProps & {
  name: Path<T>;
};

const ControlledTextField = <T extends FieldValues>({
  name,
  ...rest
}: ControlledTextFieldProps<T>) => {
  const { control } = useFormContext();

  const transformValue = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, type } = e.target;

    let finalValue: any = value;

    if (type === "number") {
      finalValue = value === "" ? null : parseFloat(value);
    }

    return finalValue;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <TextField
            variant="outlined"
            error={!!error}
            helperText={error?.message}
            {...field}
            {...rest}
            onChange={(e) => field.onChange(transformValue(e))}
          />
        );
      }}
    />
  );
};

export default ControlledTextField;
