import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { TextField, type TextFieldProps } from "@mui/material";

type ControlledTextFieldProps<T extends FieldValues> = TextFieldProps & {
  name: Path<T>;
  transformValue?: (value: string) => any;
};

const ControlledTextField = <T extends FieldValues>({
  name,
  transformValue,
  ...rest
}: ControlledTextFieldProps<T>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...rest}
          onChange={(e) => {
            const value = e.target.value;
            const transformedValue = transformValue?.(value) ?? value;
            field.onChange(transformedValue);
          }}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default ControlledTextField;
