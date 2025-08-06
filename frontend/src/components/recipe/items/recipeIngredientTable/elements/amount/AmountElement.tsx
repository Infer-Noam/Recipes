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
