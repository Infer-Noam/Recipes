import { type SxProps } from "@mui/material";
import type { GridSize, ResponsiveStyleValue } from "@mui/system";

const gridItemSize: ResponsiveStyleValue<GridSize> = {
  xs: 12,
  lg: 8,
  xl: 6,
};

const textField: SxProps = {
  mr: 5,
};

const errorTypography = { mt: 1, display: "block" };

export default { textField, errorTypography, gridItemSize };
