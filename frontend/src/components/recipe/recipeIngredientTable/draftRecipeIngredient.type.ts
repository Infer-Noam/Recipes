import type { RecipeIngredient } from "../../../../../shared/types/recipeIngredient.type";

export type DraftRecipeIngredient = Partial<Omit<RecipeIngredient, "uuid">> &
  Pick<RecipeIngredient, "uuid">;
