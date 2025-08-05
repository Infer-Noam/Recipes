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

const nameGridSize: ResponsiveStyleValue<GridSize> = { xs: 6, lg: 3.5, xl: 6 };

const chefGridSize: ResponsiveStyleValue<GridSize> = { xs: 6, lg: 4.5, xl: 6 };

const descriptionGridSize: ResponsiveStyleValue<GridSize> = {
  xs: 12,
  lg: 8,
  xl: 6,
};

const imageGridSize: ResponsiveStyleValue<GridSize> = { xs: 12, lg: 8, xl: 6 };

const stepListGridSize: ResponsiveStyleValue<GridSize> = {
  xs: 12,
  lg: 8,
  xl: 6,
};

const ingredientTableGridSize: ResponsiveStyleValue<GridSize> = {
  xs: 12,
  lg: 8,
  xl: 6,
};

const saveGridSize: ResponsiveStyleValue<GridSize> = {
  xs: 4,
  md: 3,
  lg: 4.1,
  xl: 3,
};

const deleteGridSize: ResponsiveStyleValue<GridSize> = {
  xs: 4,
  md: 3,
  lg: 4.1,
  xl: 3,
};

export default {
  methodList,
  gridContainer,
  nameGridSize,
  chefGridSize,
  descriptionGridSize,
  imageGridSize,
  stepListGridSize,
  ingredientTableGridSize,
  saveGridSize,
  deleteGridSize,
};
