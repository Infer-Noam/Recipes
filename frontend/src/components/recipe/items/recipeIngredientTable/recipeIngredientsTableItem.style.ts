import { type SxProps } from "@mui/material";
import { type GridSize } from "@mui/material";
import type { ResponsiveStyleValue } from "@mui/system";

const container: SxProps = {
  minWidth: "500px",
  overflow: "auto",
};

const gridItemSize: ResponsiveStyleValue<GridSize> = {
  xs: 12,
  lg: 8,
  xl: 6,
};

export default {
  container,
  gridItemSize,
};
