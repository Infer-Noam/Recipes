import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { TextField, type TextFieldProps } from "@mui/material";

type ControlledTextFieldProps<T extends FieldValues> = TextFieldProps & {
  name: Path<T>;
};

const ControlledTextField = <T extends FieldValues>({
  name,
  ...rest
}: ControlledTextFieldProps<T>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          variant="outlined"
          error={!!error}
          helperText={error?.message}
          {...field}
          {...rest}
          onChange={(e) => {
            const value = e.target.value;
            const inputType = e.target.type;

            let finalValue: any = value;

            if (inputType === "number") {
              finalValue = value === "" ? null : parseFloat(value);
            }

            field.onChange(finalValue);
          }}
        />
      )}
    />
  );
};

export default ControlledTextField;
