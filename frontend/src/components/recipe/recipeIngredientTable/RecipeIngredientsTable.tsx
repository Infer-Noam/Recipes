import { type FC, useState } from "react";
import Styles from "./recipeIngredientsTable.style";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, TextField, Autocomplete, Paper } from "@mui/material";
import { type RecipeIngredient as RecipeIngredientModel } from "../../../../../shared/types/recipeIngredient.type";
import { type Ingredient as IngredientModel } from "../../../../../shared/types/ingredient.type";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { MeasurementUnit } from "../../../../../shared/enums/measurement-unit.enum";

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

  const setRecipeIngredient = (
    uuid: string,
    updatedFields: Partial<RecipeIngredientModel>
  ) => {
    setRecipeIngredients((prev) =>
      prev.map((ri) => (ri.uuid === uuid ? { ...ri, ...updatedFields } : ri))
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Ingredient</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Measurement unit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recipeIngredients.map((ri) => (
            <TableRow
              key={ri.uuid}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Autocomplete
                  sx={{}}
                  value={ri.ingredient.name}
                  onChange={(event: any, newValue: string | null) => {
                    setRecipeIngredients((prev) => {
                      return prev.map((p) => (p.uuid === ri.uuid ? p : p));
                    });
                  }}
                  options={ingredientsOptions.map((i) => i.name)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </TableCell>
              <TableCell align="center">{ri.amount}</TableCell>
              <TableCell align="center">
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={ri.measurementUnit}
                    onChange={() => {}}
                  >
                    {Object.values(MeasurementUnit).map((m, index) => (
                      <MenuItem key={index} value={m}>
                        {m}
                      </MenuItem>
                    ))}
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
