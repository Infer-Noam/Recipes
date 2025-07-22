import { type FC } from "react";
import Styles from "./recipeIngredientsTable.style";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  TextField,
  Autocomplete,
  Paper,
  Typography,
  Select,
  MenuItem,
  IconButton,
  Button,
} from "@mui/material";
import { type RecipeIngredient as RecipeIngredientModel } from "../../../../../shared/types/recipeIngredient.type";
import { type Ingredient as IngredientModel } from "../../../../../shared/types/ingredient.type";
import { MeasurementUnit } from "../../../../../shared/enums/measurement-unit.enum";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { type DraftRecipeIngredient } from "../recipeIngredientTable/draftRecipeIngredient.type";

type RecipeIngredientsTableProps = {
  recipeIngredients: DraftRecipeIngredient[];
  ingredientsOptions: IngredientModel[];
  setRecipeIngredient: (
    uuid: string,
    updatedFields: Partial<RecipeIngredientModel>
  ) => void;
  addRecipeIngredient: () => void;
  removeRecipeIngredient: (uuid: string) => void;
};

export const RecipeIngredientsTable: FC<RecipeIngredientsTableProps> = ({
  recipeIngredients,
  ingredientsOptions,
  setRecipeIngredient,
  addRecipeIngredient,
  removeRecipeIngredient,
}) => {
  const CustomTableCell = (label: string) => (
    <TableCell align="center">
      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        {label}
      </Typography>
    </TableCell>
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={Styles.container} aria-label="simple table">
        <TableHead>
          <TableRow>
            {CustomTableCell("Ingredients")}
            {CustomTableCell("Amount")}
            {CustomTableCell("Measurement unit")}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {recipeIngredients.map((ri) => (
            <TableRow key={ri.uuid} sx={Styles.recipeIngredientTableRow}>
              <TableCell align="center">
                <Box sx={Styles.ingredientAutocompleteBox}>
                  <Autocomplete
                    sx={Styles.ingredientAutocomplete}
                    value={ri?.ingredient?.name ?? ""}
                    onChange={(_: any, newValue: string | null) => {
                      if (!newValue) return;

                      const ingredientIndex = ingredientsOptions.findIndex(
                        (i) => i.name === newValue
                      );
                      if (ingredientIndex === -1) return;

                      setRecipeIngredient(ri.uuid, {
                        ingredient: ingredientsOptions[ingredientIndex],
                      });
                    }}
                    options={ingredientsOptions.map((i) => i.name)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Box>
              </TableCell>
              <TableCell align="center">
                <TextField
                  type="number"
                  value={ri?.amount ?? 0}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value >= 0 && value <= 99) {
                      setRecipeIngredient(ri.uuid, { amount: value });
                    }
                  }}
                  slotProps={{
                    input: {
                      sx: Styles.amountTextFieldInput,
                      inputProps: {
                        min: 0,
                        max: 99,
                      },
                    },
                  }}
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="center">
                <Select
                  sx={Styles.measurementUnitSelect}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={ri.measurementUnit}
                  onChange={(e) => {
                    setRecipeIngredient(ri.uuid, {
                      measurementUnit: e.target.value,
                    });
                  }}
                >
                  {Object.values(MeasurementUnit).map((m, index) => (
                    <MenuItem key={index} value={m}>
                      {m}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => removeRecipeIngredient(ri.uuid)}>
                  <RemoveIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              <Button onClick={addRecipeIngredient} startIcon={<AddIcon />}>
                Add ingredient
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
