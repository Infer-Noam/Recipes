import { type SxProps } from "@mui/material";

const ingredientAutocomplete: SxProps = {
  width: "175px",
};

const ingredientAutocompleteBox: SxProps = {
  display: "flex",
  justifyContent: "center",
};

const amountTextFieldInput: SxProps = {
  "& input": {
    textAlign: "center",
  },
};

const recipeIngredientTableRow: SxProps = {
  "&:last-child td, &:last-child th": { border: 0 },
};

const measurementUnitSelect: SxProps = { width: "110px" };

const container: SxProps = {
  minWidth: "500px",
  overflow: "auto",
};

export default {
  amountTextFieldInput,
  recipeIngredientTableRow,
  ingredientAutocomplete,
  ingredientAutocompleteBox,
  measurementUnitSelect,
  container,
};
