import { IngredientDetailsSchema } from "@shared/validation/ingredientDetailsSchema.validation";
import { z } from "zod";

export type IngredientFormData = z.infer<typeof IngredientDetailsSchema>;
