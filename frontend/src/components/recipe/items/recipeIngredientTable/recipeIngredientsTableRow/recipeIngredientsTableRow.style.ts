import { type SxProps } from "@mui/material";

const recipeIngredientTableRow: SxProps = {
  "&:last-child td, &:last-child th": { border: 0 },
};

const centerAlign: SxProps = {
  textAlign: "center",
  verticalAlign: "top",
};

export default {
  recipeIngredientTableRow,
  centerAlign,
};
