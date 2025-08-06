import type { FC } from "react";
import Styles from "./amountElement.style";
import type { RecipeFormData } from "../../../../Recipe.type";
import { type Control } from "react-hook-form";
import ControlledTextField from "../../../../../../components/controlledTextField/ControlledTextField";

type AmountElementProps = {
  index: number;
  control: Control<RecipeFormData, unknown, RecipeFormData>;
};

const AmountElement: FC<AmountElementProps> = ({ index, control }) => (
  <ControlledTextField
    name={`ingredients.${index}.amount`}
    control={control}
    type="number"
    transformValue={(value) => parseInt(value, 10)}
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
  />
);

export default AmountElement;
