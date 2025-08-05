import { type Ingredient as IngredientModel } from "../../../../../shared/types/ingredient.type";
import type { RecipeDetails } from "../../../../../shared/types/recipe.type";
import { type Control } from "react-hook-form";

export type RecipeIngredientsTableProps = {
  ingredients: IngredientModel[];
  control: Control<RecipeDetails, unknown, RecipeDetails>;
  recipeUuid: string;
};
