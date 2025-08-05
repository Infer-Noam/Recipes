import { TextField } from "@mui/material";
import type { FC } from "react";
import Styles from "./amount.style";
import type { RecipeFormData } from "../../../../Recipe.type";

type AmountElementProps = {
  recipeIngredient: RecipeFormData["ingredients"][number];
  setAmount: (amount: number, uuid?: string | undefined) => void;
  error: any;
};

const AmountElement: FC<AmountElementProps> = ({
  recipeIngredient,
  setAmount,
  error,
}) => (
  <TextField
    type="number"
    value={recipeIngredient?.amount}
    onChange={(e) => setAmount(parseInt(e.target.value), recipeIngredient.uuid)}
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
    helperText={error?.message && "Valid amount is required"}
  />
);

export default AmountElement;
