import type { FC } from "react";
import Styles from "./amountElement.style";
import ControlledTextField from "../../../../../../components/controlledTextField/ControlledTextField";

type AmountElementProps = {
  index: number;
};

const AmountElement: FC<AmountElementProps> = ({ index }) => (
  <ControlledTextField
    name={`ingredients.${index}.amount`}
    type="number"
    slotProps={{
      input: {
        sx: Styles.amountTextFieldInput,
        inputProps: {
          min: 0,
          max: 99,
        },
      },
    }}
  />
);

export default AmountElement;
