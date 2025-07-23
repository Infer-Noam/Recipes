import type { RecipeIngredientDetails } from "../../../../../shared/types/recipeIngredient.type";

export type DraftRecipeIngredient = Partial<
  Omit<RecipeIngredientDetails, "uuid">
> &
  Pick<RecipeIngredientDetails, "uuid">;
