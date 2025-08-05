import { type Ingredient as IngredientModel } from "../../../../../shared/types/ingredient.type";
import { type Control } from "react-hook-form";
import type { RecipeFormData } from "../Recipe.type";

export type RecipeIngredientsTableProps = {
  ingredients: IngredientModel[];
  control: Control<RecipeFormData, unknown, RecipeFormData>;
};
