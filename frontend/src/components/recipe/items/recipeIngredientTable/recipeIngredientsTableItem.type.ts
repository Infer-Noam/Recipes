import { type Ingredient as IngredientModel } from "@shared/types/ingredient.type";
import type { RecipeIngredientSchema } from "@shared/validation/recipeIngredientSchema.validation";
import { z } from "zod";

export type RecipeIngredientsTableItemProps = {
  ingredients: IngredientModel[];
};

export type RecipeIngredientFormData = z.infer<typeof RecipeIngredientSchema>;
