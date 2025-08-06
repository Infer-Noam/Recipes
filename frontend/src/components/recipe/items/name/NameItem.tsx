import type { Control } from "react-hook-form";
import type { RecipeFormData } from "../../Recipe.type";
import type { FC } from "react";
import { Grid } from "@mui/material";
import ControlledTextField from "../../../controlledTextField/ControlledTextField";
import Styles from "./name.style";

type NameItemProps = {
  control: Control<RecipeFormData, unknown, RecipeFormData>;
};

const NameItem: FC<NameItemProps> = ({ control }) => (
  <Grid size={Styles.gridItemSize}>
    <ControlledTextField
      name="name"
      control={control}
      fullWidth
      label="Recipe name"
      variant="outlined"
    />
  </Grid>
);

export default NameItem;
