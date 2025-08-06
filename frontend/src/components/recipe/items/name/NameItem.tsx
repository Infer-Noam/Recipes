import type { FC } from "react";
import { Grid } from "@mui/material";
import ControlledTextField from "../../../controlledTextField/ControlledTextField";
import Styles from "./name.style";

const NameItem: FC = () => (
  <Grid size={Styles.gridItemSize}>
    <ControlledTextField
      name="name"
      fullWidth
      label="Recipe name"
      variant="outlined"
    />
  </Grid>
);

export default NameItem;
