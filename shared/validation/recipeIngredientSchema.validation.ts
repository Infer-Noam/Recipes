import { z } from "zod";
import { UuidSchema } from "./uuidSchema.validation";
import { MeasurementUnit } from "../enums/measurement-unit.enum";
import { IngredientDetailsSchema } from "./ingredientDetailsSchema.validation";

export const RecipeIngredientSchema = z.object({
  uuid: z.string().optional(),
  recipe: UuidSchema.optional(),
  ingredient: IngredientDetailsSchema,
  amount: z
    .number()
    .gt(0, "Amount must be greater than zero")
    .max(100, "Amount must be less than 100"),
  measurementUnit: z.enum(MeasurementUnit, "Measurement unit is required"),
});
