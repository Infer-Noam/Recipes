import { TableRow, TableCell, IconButton } from "@mui/material";
import type { FC } from "react";
import AmountElement from "../elements/amount/AmountElement";
import IngredientElement from "../elements/ingredient/IngredientElement";
import MeasurementUnitElement from "../elements/measurementUnit/MeasurementUnitElement";
import type { Ingredient } from "@shared/types/ingredient.type";
import type { UseFieldArrayRemove } from "react-hook-form";
import Styles from "./recipeIngredientsTableRow.style";
import RemoveIcon from "@mui/icons-material/Remove";
import type { RecipeIngredientFormData } from "../recipeIngredientsTableItem.type";

type RecipeIngredientTableRowProps = {
  recipeIngredients: RecipeIngredientFormData[];
  ingredients: Ingredient[];
  remove: UseFieldArrayRemove;
};

const RecipeIngredientTableRow: FC<RecipeIngredientTableRowProps> = ({
  recipeIngredients,
  ingredients,
  remove,
}) =>
  recipeIngredients.map((recipeIngredient, index) => (
    <TableRow key={recipeIngredient.uuid} sx={Styles.recipeIngredientTableRow}>
      <TableCell sx={Styles.centerAlign}>
        <IngredientElement index={index} ingredients={ingredients} />
      </TableCell>
      <TableCell sx={Styles.centerAlign}>
        <AmountElement index={index} />
      </TableCell>
      <TableCell sx={Styles.centerAlign}>
        <MeasurementUnitElement index={index} />
      </TableCell>
      <TableCell>
        <IconButton onClick={() => remove(index)}>
          <RemoveIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  ));

export default RecipeIngredientTableRow;
