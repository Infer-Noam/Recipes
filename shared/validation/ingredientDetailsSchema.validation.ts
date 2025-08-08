import { z } from "zod";
import { IngredientNameFieldSchema } from "./ingredientNameSchema.validation";

export const IngredientDetailsSchema = z.object(
  {
    uuid: z.uuid(),
    name: IngredientNameFieldSchema,
  },
  "Ingredient is required"
);
