import { type SxProps } from "@mui/material";

const container: SxProps = {
  minWidth: "550px",
  overflow: "auto",
};

const centerAlign: SxProps = {
  textAlign: "center",
  verticalAlign: "top",
};

const labelTypography = { fontWeight: "bold" };

const CELL_COUNT = 5;

export default {
  container,
  centerAlign,
  labelTypography,
  CELL_COUNT,
};
