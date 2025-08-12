import { RecipeStepSchema } from "@shared/validation/recipeStepSchema.validation";
import { z } from "zod";

export type RecipeStepFormData = z.infer<typeof RecipeStepSchema>;
