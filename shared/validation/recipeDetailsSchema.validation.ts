import { z } from "zod";
import { IMAGE_URL_REGEX } from "../consts/regex.const";
import { RecipeIngredientSchema } from "./recipeIngredientSchema.validation";
import { ChefDetailsSchema } from "./chefDetailsSchema.validation";
import { RecipeStepSchema } from "./recipeStepSchema.validation";

export const RecipeDetailsSchema = z.object({
  uuid: z.uuid().optional(),
  name: z
    .string()
    .min(1, "Recipe name is required")
    .max(20, "Recipe name must be at most 20 characters"),
  steps: z
    .array(RecipeStepSchema)
    .min(1, "At least one step is required")
    .max(20, "You can add up to 20 steps only"),
  chef: ChefDetailsSchema,
  ingredients: z
    .array(RecipeIngredientSchema)
    .min(1, "At least one ingredient is required")
    .max(50, "You can add up to 50 ingredients only"),
  description: z.string(),
  imageUrl: z.string().regex(IMAGE_URL_REGEX, "Image URL must be valid"),
});
