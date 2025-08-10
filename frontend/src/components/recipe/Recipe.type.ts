import type { RecipeDetailsSchema } from "../../../../shared/validation/recipeDetailsSchema.validation";
import { z } from "zod";

export type RecipeFormData = z.infer<typeof RecipeDetailsSchema>;
