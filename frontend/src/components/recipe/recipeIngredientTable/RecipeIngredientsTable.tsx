import { type FC, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TextField, Autocomplete, Paper } from "@mui/material";
import { type RecipeIngredient as RecipeIngredientModel } from "../../../../../shared/types/recipeIngredient.type";
import { type Ingredient as IngredientModel } from "../../../../../shared/types/ingredient.type";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { MeasurementUnit } from "../../../../../shared/enums/measurement-unit.enum";
import Styles from "./recipeIngredientsTable.style";

type RecipeIngredientsTableProps = {
  recipeIngredients: RecipeIngredientModel[];
  ingredientsOptions: IngredientModel[];
};

export const RecipeIngredientsTable: FC<RecipeIngredientsTableProps> = ({
  recipeIngredients: defaultRecipeIngredients,
  ingredientsOptions,
}) => {
  const [recipeIngredients, setRecipeIngredients] = useState(
    defaultRecipeIngredients
  );

  const onIngredientChange = (recipeIngredient: RecipeIngredientModel) => {
    setRecipeIngredients((prev) => {
      return prev.map((p) => (p.uuid === recipeIngredient.uuid ? p : p));
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Ingredient</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Measurement unit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recipeIngredients.map((recipeIngredient) => (
            <TableRow key={recipeIngredient.uuid} sx={Styles.tableRow}>
              <TableCell component="th" scope="row">
                <Autocomplete
                  value={recipeIngredient.ingredient.name}
                  onChange={() => onIngredientChange(recipeIngredient)}
                  options={ingredientsOptions.map((i) => i.name)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </TableCell>
              <TableCell align="center">{recipeIngredient.amount}</TableCell>
              <TableCell align="center">
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={recipeIngredient.measurementUnit}
                  >
                    {Object.values(MeasurementUnit).map(
                      (measurementUnit, index) => (
                        <MenuItem key={index} value={measurementUnit}>
                          {measurementUnit}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
