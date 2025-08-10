import { z } from "zod";

export const IngredientNameFieldSchema = z
  .string()
  .min(1, "Ingredient name is required")
  .max(15, "Ingredient name must be at most 15 characters");

export const IngredientNameSchema = z.object({
  name: IngredientNameFieldSchema,
});
