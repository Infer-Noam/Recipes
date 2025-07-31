import type { RecipeIngredientDetails } from "../../../../../shared/types/recipeIngredient.type";

export type DraftRecipeIngredient = {
  uuid: string;
} & Partial<Omit<RecipeIngredientDetails, "uuid">>;
