import { TextField } from "@mui/material";
import type { FC } from "react";
import Styles from "./amountElement.style";
import type { RecipeFormData } from "../../../../Recipe.type";
import { Controller, type Control } from "react-hook-form";

type AmountElementProps = {
  index: number;
  control: Control<RecipeFormData, unknown, RecipeFormData>;
  recipeIngredient: RecipeFormData["ingredients"][number];
};

const AmountElement: FC<AmountElementProps> = ({
  index,
  control,
  recipeIngredient,
}) => (
  <Controller
    name={`ingredients.${index}.amount`}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <TextField
        type="number"
        value={recipeIngredient?.amount}
        onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
        slotProps={{
          input: {
            sx: Styles.amountTextFieldInput,
            inputProps: {
              min: 0,
              max: 99,
            },
          },
        }}
        variant="outlined"
        error={!!error}
        helperText={error?.message}
      />
    )}
  ></Controller>
);

export default AmountElement;
