import { type SxProps } from "@mui/material";
import { type GridSize } from "@mui/material";
import type { ResponsiveStyleValue } from "@mui/system";

const recipeIngredientTableRow: SxProps = {
  "&:last-child td, &:last-child th": { border: 0 },
};

const container: SxProps = {
  minWidth: "500px",
  overflow: "auto",
};

const centerAlign: SxProps = {
  textAlign: "center",
  verticalAlign: "top",
};

const labelTypography: SxProps = { fontWeight: "bold" };

const gridItemSize: ResponsiveStyleValue<GridSize> = {
  xs: 12,
  lg: 8,
  xl: 6,
};

export default {
  recipeIngredientTableRow,
  container,
  centerAlign,
  labelTypography,
  gridItemSize,
};
