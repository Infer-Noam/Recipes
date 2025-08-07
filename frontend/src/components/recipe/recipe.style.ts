import { type GridSize, type SxProps } from "@mui/material";
import type { ResponsiveStyleValue } from "@mui/system";

const methodList: SxProps = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

const gridContainer: SxProps = {
  justifyContent: "center",
};

const descriptionItemGridSize: ResponsiveStyleValue<GridSize> = {
  xs: 12,
  lg: 8,
  xl: 6,
};

const saveGridItemSize: ResponsiveStyleValue<GridSize> = {
  xs: 4,
  md: 3,
  lg: 4.1,
  xl: 3,
};

const deleteGridItemSize: ResponsiveStyleValue<GridSize> = {
  xs: 4,
  md: 3,
  lg: 4.1,
  xl: 3,
};

export default {
  methodList,
  gridContainer,
  descriptionItemGridSize,
  saveGridItemSize,
  deleteGridItemSize,
};
