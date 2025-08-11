import { z } from "zod";
import { UuidSchema } from "./uuidSchema.validation";
import { MeasurementUnit } from "../enums/measurement-unit.enum";
import { IngredientDetailsSchema } from "./ingredientDetailsSchema.validation";

export const RecipeIngredientSchema = z.object({
  uuid: z.string().optional(),
  recipe: UuidSchema.optional(),
  ingredient: IngredientDetailsSchema,
  amount: z.number().min(1, "Amount must be at least 1"),
  measurementUnit: z.enum(MeasurementUnit, "Measurement unit is required"),
});
