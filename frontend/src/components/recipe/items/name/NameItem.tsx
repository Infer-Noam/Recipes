import type { Control } from "react-hook-form";
import type { RecipeFormData } from "../../Recipe.type";
import type { FieldError } from "react-hook-form";
import type { FC } from "react";
import { Grid } from "@mui/material";
import ControlledTextField from "../../../controlledTextField/ControlledTextField";
import Styles from "./name.style";

type NameItemProps = {
  control: Control<RecipeFormData, unknown, RecipeFormData>;
  error: FieldError | undefined;
};

const NameItem: FC<NameItemProps> = ({ control, error }) => (
  <Grid size={Styles.gridItemSize}>
    <ControlledTextField
      name="name"
      control={control}
      fullWidth
      label="Recipe name"
      variant="outlined"
      fieldError={error}
    />
  </Grid>
);

export default NameItem;
